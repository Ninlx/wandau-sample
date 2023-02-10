(function ($) {
  $(document).ready(function () {
    "use strict"
  })

  /* ====== data background image ====== */
  var pageSection = $("*")
  pageSection.each(function (indx) {
    if ($(this).attr("data-background")) {
      $(this).css("background", "url(" + $(this).data("background") + ")")
    }
  })

  /* not included */
  /* ====== data background image ====== */
  var pageSection = $("*")
  pageSection.each(function (indx) {
    if ($(this).attr("data-background")) {
      $(this).css("background", $(this).data("background"))
    }
  })

  /* ====== slider ====== */
  var sliderimages = new Swiper(".slider-images", {
    spaceBetween: 0,
    direction: "vertical",
    autoplay: {
      delay: 9500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".button-next",
      prevEl: ".button-prev",
    },
    touchRatio: 0,
    pagination: {
      el: ".swiper-fraction",
      type: "fraction",
    },
    loop: true,
    loopedSlides: 1,
    thumbs: {
      swiper: slidertexts,
    }
  })

  /* ====== slider thumbs ====== */
  var slidertexts = new Swiper(".slider-texts", {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 1,
    touchRatio: 0,
    slideToClickedSlide: false,
    loop: true,
    loopedSlides: 1,
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    }
  })

  if ($(".slider-images")[0]) {
    sliderimages.controller.control = slidertexts
    slidertexts.controller.control = sliderimages
  } else {
    }

  /* not included */
  /* ====== slider ====== */
  var artsliderimages = new Swiper(".art-slider-images", {
    spaceBetween: 0,
    autoplay: {
      delay: 9500,
      disableOnInteraction: false,
    },
    loop: true,
    loopedSlides: 4,
    thumbs: {
      swiper: artslidercontent,
    },
    breakpoints: {
      1024: {
        loopedSlides: 3,
      },
      768: {
        loopedSlides: 2,
      },
      640: {
        loopedSlides: 1,
      },
      320: {
        loopedSlides: 1,
      }
    }
  })

  /* not included */
  /* ====== slider thumbs ====== */
  var artslidercontent = new Swiper(".art-slider-content", {
    spaceBetween: 30,
    direction: "vertical",
    slidesPerView: 4,
    loop: true,
    loopedSlides: 4,
    breakpoints: {
      1024: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 2,
      },
      640: {
        slidesPerView: 1,
      },
      320: {
        slidesPerView: 1,
      }
    }
  })

  /* not included */
  if ($(".art-slider-images")[0]) {
    artsliderimages.controller.control = artslidercontent
    artslidercontent.controller.control = artsliderimages
  } else {
    }
})(jQuery)