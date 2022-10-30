const wrapper = document.querySelector(".wrapper")
const carouselContainer = document.querySelector(".carousel-container")
const carousel = document.querySelector(".carousel")
const slides = carousel.querySelectorAll(".slide")
const indexButtons = document.querySelectorAll(".idx-btn")

var currentSlideIdx = 1;

var size = 600;
var isHovering = false;

const slideTo = (btn,index) =>{
  indexButtons.forEach((btn) => btn.classList.remove("highlighted"))
  btn.classList.toggle("highlighted")
  currentSlideIdx = (index) % slides.length;
  carousel.style.transform = `translateX(${-size * currentSlideIdx}px)`
}

const slideRight = () => {
  indexButtons.forEach((btn) => btn.classList.remove("highlighted"))
  indexButtons[currentSlideIdx].classList.toggle("highlighted")
  carousel.style.transform = `translateX(${-size * currentSlideIdx}px)`
  currentSlideIdx = (currentSlideIdx + 1) % slides.length;

}
const slideLeft = () => {
  // weirdo
  indexButtons.forEach((btn) => btn.classList.remove("highlighted"))
  if(currentSlideIdx === 1) currentSlideIdx = slides.length-1
  else currentSlideIdx = (currentSlideIdx - 1) % slides.length 
  indexButtons[currentSlideIdx].classList.toggle("highlighted")
  carousel.style.transform = `translateX(${-size*currentSlideIdx}px)`

}   
setInterval(() => !isHovering ? slideRight(): null, 5000)
// event listeners
wrapper.querySelector('.btn.left').addEventListener('click', slideLeft)
wrapper.querySelector('.btn.right').addEventListener('click', slideRight)
wrapper.addEventListener('mouseover', () => isHovering = true)
wrapper.addEventListener('mouseout', () => isHovering = false)

indexButtons.forEach((idxBtn, idx) => {
  console.log(idxBtn, idx)
  idxBtn.addEventListener('click', () => slideTo(idxBtn, idx))
})
