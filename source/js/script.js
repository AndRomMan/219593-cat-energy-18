let navMain = document.querySelector('.header-nav');
let navToggle = document.querySelector('.header-nav__toggle');
let slider = document.querySelector('.slider');
let buttonBefore = document.querySelector('.slider__toggle--before');
let buttonAfter = document.querySelector('.slider__toggle--after');
let sliderIndicator = document.querySelector('.slider__indicator');

// svg4everybody();

navMain.classList.add('header-nav--closed');
slider.classList.add('slider--before');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('header-nav--opened')) {
    navMain.classList.remove('header-nav--opened');
    navMain.classList.add('header-nav--closed');
  } else {
    navMain.classList.remove('header-nav--closed');
    navMain.classList.add('header-nav--opened');
  }
});

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
