const asyncAdd = async (a,b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return Promise.reject('Argumenty muszą mieć typ number! ' +a + " " + b)
  }
  return new Promise((resolve, reject) => {
    setTimeout(() =>{
      resolve(a+b)
    }, 100)
  })
}

// divide and conquer the problem and awaitAll the results
const asyncAddAll = async (...args) => {
  let data = [...args];

  while (data.length > 1) {
    let temp = []
    while (data.length > 0) {
      if (data.length === 1) {
        temp.push(Promise.resolve(data.pop()))
      } else {
        temp.push(asyncAdd(data.pop(), data.pop()))
      }
    }
    data = await Promise.all(temp)
    console.log(data)
  }
  return data.pop()
}

async function measurePerformance(name, cb) {
  console.log(`Start: ${name}`);
  performance.mark('mf-start')
  const result = await cb()
  performance.mark('mf-end')
  const runTime = performance.measure('Czas wykonania kodu', 'mf-start', 'mf-end')
  console.log(`Wynik z ${name}: ${result}`)
  console.log(`Czas wykonywania: ${runTime.duration.toFixed(2)}ms`)
}