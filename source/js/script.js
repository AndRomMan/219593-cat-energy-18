let navMain = document.querySelector('.header-nav');
let navToggle = document.querySelector('.header-nav__toggle');

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
