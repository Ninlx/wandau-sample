/* ====== document ====== */
const hamburger = document.querySelector('.hamburger')
const searchBtn = document.querySelector('.search-button')
const searchBox = document.querySelector('.search-box')
const sideWidget = document.querySelector('.side-widget')
const sectionWrapper = document.querySelector('.section-wrapper')
const preloader = document.getElementById("preloader")
const progressBar = document.getElementById("progress-bar")

/* ====== hamburger ====== */
hamburger.onclick = () => {
  hamburger.classList.toggle('active')
  sideWidget.classList.toggle('active')
  sectionWrapper.classList.toggle('no-transform')
}

/* ====== search ====== */
searchBtn.onclick = () => {
  searchBox.classList.toggle('active')
  sectionWrapper.classList.toggle('no-transform')
}

/* ====== preloader ====== */
let settings = {
  progressSize: 320,
  progressColor: "#ffffff",
  lineWidth: 2,
  lineCap: "round",
  preloaderAnimationDuration: 800,
  startDegree: -90,
  finalDegree: 270
}

function setAttributes(elem, attrs) {
  for (let key in attrs) {
    elem.setAttribute(key, attrs[key])
  }
}

/* ====== create element ====== */
let preloaderDiv = document.createElement('div')
let canvas = document.createElement('canvas')

function size() {
  let width = window.innerWidth,
    height = window.innerHeight
  if (width > height) {
    size = Math.min(settings.progressSize, height / 2)
  } else {
    size = Math.min(settings.progressSize, width - 50)
  }
}

setAttributes(preloaderDiv, {
  class: "preloader",
  id: "preloader",
  style: "transition: opacity " + settings.preloaderAnimationDuration / 1000 + "s"
})

setAttributes(canvas, {
  class: "progress-bar",
  id: "progress-bar",
  width: settings.progressSize,
  height: settings.progressSize
})

let images = document.images
let imagesAmount = images.length
let imagesLoaded = 0
let barCtx = progressBar.getContext("2d")
let circleCenterX = progressBar.width / 2
let circleCenterY = progressBar.height / 2
let circleRadius = circleCenterX - settings.lineWidth
let degreesPerPercent = 3.6
let currentProgress = 0
let showedProgress = 0
let progressStep = 0
let progressDelta = 0
let startTime = null
let running

(function () {
  return (
    requestAnimationFrame ||
    mozRequestAnimationFrame ||
    webkitRequestAnimationFrame ||
    oRequestAnimationFrame ||
    msRequestAnimationFrame ||
    function (callback) {
      setTimeout(callback, 1000 / 60)
    }
  )
})()

Math.radians = function (degrees) {
  return ( degrees * Math.PI ) / 180
}

progressBar.style.opacity = settings.progressOpacity
barCtx.strokeStyle = settings.progressColor
barCtx.lineWidth = settings.lineWidth
barCtx.lineCap = settings.lineCap

let angleMultiplier = (Math.abs(settings.startDegree) + Math.abs(settings.finalDegree)) / 360
let startAngle = Math.radians(settings.startDegree)

let body = document.querySelector('body')
body.style.overflowY = "hidden"
preloader.style.backgroundColor = settings.preloaderBackground
for (let i = 0; i < imagesAmount; i++) {
  let imageClone = new Image();
  imageClone.onload = onImageLoad;
  imageClone.onerror = onImageLoad;
  imageClone.src = images[i].src;
}

function onImageLoad() {
  if (running === true) running = false
  imagesLoaded++
  if (imagesLoaded >= imagesAmount) hidePreloader()
  progressStep = showedProgress
  currentProgress = ((100 / imagesAmount) * imagesLoaded) << 0
  progressDelta = currentProgress - showedProgress

  setTimeout(function () {
    if (startTime === null) startTime = performance.now()
    running = true
    animate()
  }, 10)
}

function animate() {
  if (running === false) {
    startTime = null
    return
  }

  let timeDelta = Math.min(1, (performance.now() - startTime) / settings.preloaderAnimationDuration)
  showedProgress = progressStep + progressDelta * timeDelta

  if (timeDelta <= 1) {
    barCtx.clearRect(0, 0, progressBar.width, progressBar.height)
    barCtx.beginPath()
    barCtx.arc(
      circleCenterX,
      circleCenterY,
      circleRadius,
      startAngle,
      Math.radians(showedProgress * degreesPerPercent) * angleMultiplier + startAngle)
    barCtx.stroke()
    requestAnimationFrame(animate)
  } else {
    startTime = null
  }
}

function hidePreloader() {
  setTimeout(function () {
    const body = document.querySelector("body")
    body.classList.add("page-loaded")
    document.body.style.overflowY = ""
  }, settings.preloaderAnimationDuration + 100)
}

var resizeTimer

/* not included */
/* ====== locomotive ====== */
gsap.registerPlugin(ScrollTrigger)
const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".smooth-scroll"),
  smooth: true,
  class: "is-inview",
})

/* not included */
ScrollTrigger.addEventListener("refresh", () => locoScroll.update())
ScrollTrigger.refresh()