document.addEventListener("DOMContentLoaded", () => init())

const getConfig = async () => {
    return await fetch("/config.json")
        .then(res => res.json())
        .then(data =>  {
            console.table(data)
            return data;
        })
}
const animate = (dots, ctx, canvas) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(dot => {
        dot.update();
        dot.draw(ctx);
    });
    requestAnimationFrame(animate);
}


const init = async () => {
    var dots = [];
    var config = await getConfig();
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // spawn random dots
    for(let i = 0; i < config.numOfDots; i++) {
        let dot = new Dot(
            Math.random() * canvas.innerWidth,
            Math.random() * canvas.innerHeight,
            Math.random() * config.maxStartVelocity,
            Math.random() * config.maxStartVelocity,
            Math.random() * config.baseMass
        );
        dots.push(dot);
    }
    // start animation
    animate(dots, ctx, canvas);
}