// TODO сделать проверку на существование
// var bannerClose = document.querySelector('.js-banner-close');
// if (bannerClose) {
// bannerClose.addEventListener('click', function() {
// ...
// });
// }
var navMain = document.querySelector('.header-nav');
var navToggle = document.querySelector('.header-nav__toggle');

var slider = document.querySelector('.slider');
var buttonBefore = document.querySelector('.slider__toggle--before');
var buttonAfter = document.querySelector('.slider__toggle--after');
var sliderIndicator = document.querySelector('.slider__indicator');

// svg4everybody();

if (navMain) {
navMain.classList.add('header-nav--closed');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('header-nav--opened')) {
    navMain.classList.remove('header-nav--opened');
    navMain.classList.add('header-nav--closed');
  } else {
    navMain.classList.remove('header-nav--closed');
    navMain.classList.add('header-nav--opened');
  }
});
};

if (slider) {
slider.classList.add('slider--before');

buttonBefore.addEventListener('click', function () {
  if (slider.classList.contains('slider--after')) {
    slider.classList.remove('slider--after');
    slider.classList.add('slider--before');
  } else {}
});

buttonAfter.addEventListener('click', function () {
  if (slider.classList.contains('slider--before')) {
    slider.classList.remove('slider--before');
    slider.classList.add('slider--after');
  } else {}
});

sliderIndicator.addEventListener('click', function () {
  if (slider.classList.contains('slider--before')) {
    slider.classList.remove('slider--before');
    slider.classList.add('slider--after');
  } else {
    slider.classList.remove('slider--after');
    slider.classList.add('slider--before');
  }
});
};
