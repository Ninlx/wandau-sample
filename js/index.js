/* ====== accordion ====== */
let allPanels = document.querySelectorAll(".accordion > dd")
allPanels.forEach(function (panel) {
  panel.style.display = "none"
})

let panels = document.querySelector(".accordion > dt > a")
if (panels) {
  panels.addEventListener("click", function () {
    let panel = this.parentNode.nextElementSibling
    if (panel.style.display === "block") {
      panel.style.display = "none"
    } else {
      panel.style.display = "block"
    }
    return false
  })
}

/* ====== hamburger ====== */
document.querySelector(".hamburger").addEventListener("click", function () {
  document.querySelector(".hamburger").classList.toggle("active")
  document.querySelector(".side-widget").classList.toggle("active")
  document.querySelector(".section-wrapper").classList.toggle("no-transform")
})

/* ====== search ====== */
document.querySelector(".search-button").addEventListener("click", function () {
  document.querySelector(".search-box").classList.toggle("active")
  document.querySelector(".section-wrapper").classList.toggle("no-transform")
})

/* ====== page transition ====== */
document.querySelector("body a").addEventListener("click", function (e) {
  var target = document.querySelector(this).attr("target")
  var fancybox = document.querySelector(this).data("fancybox")
  var url = this.getAttribute("href")
  if (target != "_blank" && typeof fancybox == "undefined" && url.indexOf("#") < 0) {
    e.preventDefault()
    var url = this.getAttribute("href")
    if (url.indexOf("#") != -1) {
      var hash = url.substring(url.indexOf("#"))
      if (document.querySelector("body " + hash).length != 0) {
        document.querySelector(".page-transition").classList.remove("active")
      }
    } else {
      document.querySelector(".page-transition").classList.toggle("active")
      setTimeout(function () {
        window.location = url
      }, 1000)
    }
  }
})

/* ====== tab ====== */
const tabNav = document.querySelector(".tab-nav li")
if (tabNav) {
  tabNav.addEventListener("click", function (e) {
    document.querySelector(".tab-item").hide()
    document.querySelector(".tab-nav li").classList.remove("active")
    document.querySelector(this).classList.add("active")
    var selected_tab = document.querySelector(this).querySelector("a").attr("href")
    document.querySelector(selected_tab).stop().show()
    return false
  })
}

/* ====== image box carousel ====== */
var swiper = new Swiper(".image-box-carousel", {
  slidesPerView: 1,
  loop: true,
  spaceBetween: 0,
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 60,
    }
  }
})

/* ====== kinetic teks ====== */
var slidertexts = new Swiper(".kinetic-texts", {
  spaceBetween: 10,
  centeredSlides: true,
  slidesPerView: 1,
  touchRatio: 0,
  slideToClickedSlide: false,
  loop: true,
  loopedSlides: 1,
  effect: "fade",
  navigation: {
    nextEl: ".button-next",
    prevEl: ".button-prev",
  }
})

/* ====== preloader ====== */
let settings = {
  progressSize: 320,
  progressColor: "#ffffff",
  lineWidth: 2,
  lineCap: "round",
  preloaderAnimationDuration: 800,
  startDegree: -90,
  finalDegree: 270,
};

function setAttributes(elem, attrs) {
  for (let key in attrs) {
    elem.setAttribute(key, attrs[key]);
  }
}

let preloader = document.createElement("div"),
  canvas = document.createElement("canvas"), size
(function () {
  let width = window.innerWidth,
    height = window.innerHeight;
  if (width > height) {
    size = Math.min(settings.progressSize, height / 2)
  } else {
    size = Math.min(settings.progressSize, width - 50)
  }
})()

setAttributes(preloader, {
  class: "preloader",
  id: "preloader",
  style:
    "transition: opacity " + settings.preloaderAnimationDuration / 1000 + "s",
})

setAttributes(canvas, {
  class: "progress-bar",
  id: "progress-bar",
  width: settings.progressSize,
  height: settings.progressSize,
})

preloader = document.getElementById("preloader")

let progressBar = document.getElementById("progress-bar"),
  images = document.images,
  imagesAmount = images.length,
  imagesLoaded = 0,
  barCtx = progressBar.getContext("2d"),
  circleCenterX = progressBar.width / 2,
  circleCenterY = progressBar.height / 2,
  circleRadius = circleCenterX - settings.lineWidth,
  degreesPerPercent = 3.6,
  currentProgress = 0,
  showedProgress = 0,
  progressStep = 0,
  progressDelta = 0,
  startTime = null,
  running

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

document.body.style.overflowY = "hidden"
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

/* ====== locomotive ====== */
gsap.registerPlugin(ScrollTrigger)
const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".smooth-scroll"),
  smooth: true,
  class: "is-inview",
})

ScrollTrigger.addEventListener("refresh", () => locoScroll.update())
ScrollTrigger.refresh()

/* ====== odometer ====== */
let odometer = document.querySelectorAll(".odometer")
odometer.forEach(function (el) {
  let count = el.getAttribute("data-count")
  el.innerHTML = count
})