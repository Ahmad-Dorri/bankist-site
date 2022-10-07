'use strict';
//MODAL WINDOW
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnsOpenModal = document.querySelectorAll('.btn--open-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
//SHOW MODAL
btnsOpenModal.forEach(el => el.addEventListener('click', openModal));
//HIDE MODAL
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

//SMOOTH SCROLLING
const sectionFeatures = document.querySelector('#features');
const sectionOperations = document.querySelector('#operations');
const sectionTestimonials = document.querySelector('#testimonials');
const btnScrollTo = document.querySelector('.btn--scroll-to');
btnScrollTo.addEventListener('click', function (e) {
  //   const featuresCoords = sectionFeatures.getBoundingClientRect();
  //   window.scrollTo({
  //     left: window.pageXOffset + featuresCoords.left,
  //     top: window.pageYOffset + featuresCoords.top,
  //     behavior: 'smooth',
  //   });
  sectionFeatures.scrollIntoView({ behavior: 'smooth' });
});

const navigation = document.querySelector('.navigation');
navigation.addEventListener('click', function (e) {
  e.preventDefault();
  if (!e.target.classList.contains('navigation__link')) return;
  document
    .querySelector(e.target.getAttribute('href'))
    ?.scrollIntoView({ behavior: 'smooth' });
});

// NAVIGATION OPACITY
const navHandler = function (e) {
  if (!e.target.classList.contains('navigation__link')) return;
  const link = e.target;
  const siblings = link
    .closest('.navigation__list')
    .querySelectorAll('.navigation__link');
  const logo = document.querySelector('.logo');
  siblings.forEach(el => {
    if (el === link) return;
    el.style.opacity = this;
    logo.style.opacity = this;
  });
};
navigation.addEventListener('mouseover', navHandler.bind(0.5));
navigation.addEventListener('mouseout', navHandler.bind(1));
// const navLinks = document.querySelectorAll('.navigation__link');
// navLinks.forEach(el =>
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     document
//       .querySelector(e.target.getAttribute('href'))
//       ?.scrollIntoView({ behavior: 'smooth' });
//   })
// );

//TEABED COMPONENT
const operationsBtnTab = document.querySelector('.operation__btn--box');
const operationContent = document.querySelectorAll('.operation__content');
operationsBtnTab.addEventListener('click', function (e) {
  if (!e.target.closest('.operation__btn').classList.contains('operation__btn'))
    return;
  [...e.target.closest('.operation__btn--box').children].forEach(btn =>
    btn.classList.remove('operation__btn--active')
  );
  e.target.closest('.operation__btn').classList.add('operation__btn--active');
  const btn = e.target.closest('.operation__btn').dataset.tab;
  operationContent.forEach(content =>
    content.classList.remove('operation__content--active')
  );
  document
    .querySelector(`.operation__content--${btn}`)
    .classList.add('operation__content--active');
});

//STICKY NAVIGATION
const header = document.querySelector('.header');
const sectionHero = document.querySelector('.section-hero__text-box');
const stickyNav = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) header.classList.remove('sticky');
  else header.classList.add('sticky');
};

const heroObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

heroObserver.observe(sectionHero);

const sectionAnimation = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.add('section-animation');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(sectionAnimation, {
  root: null,
  threshold: 0.15,
});
sectionObserver.observe(sectionFeatures);
sectionObserver.observe(sectionOperations);
// sectionObserver.observe(sectionTestimonials);

//lazy loading picutre
const images = document.querySelectorAll('.gallery__photo');

const lazyImage = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.setAttribute('src', entry.target.dataset.src);
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('blur');
  });
  observer.unobserve(entry.target);
};
const imageObserver = new IntersectionObserver(lazyImage, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
images.forEach(img => {
  img.classList.add('blur');
  imageObserver.observe(img);
});
// SLIDER
const dotsContainer = document.querySelector('.dots');
const createDots = function () {
  slides.forEach((_, i) => {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class = 'dots__dot' data-slide = ${i}></button>`
    );
  });
};

const slides = document.querySelectorAll('.slide');
const slidePos = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
const activeDot = function (slide) {
  const [...dots] = dotsContainer.children;

  dots.forEach(dot => {
    dot.classList.remove('dots__dot--active');

    if (Number(dot.dataset.slide) === Number(slide)) {
      dot.classList.add('dots__dot--active');
    }
  });
};
createDots();
slidePos(0);
activeDot(0);
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let currentSlide = 0;
const maxSlide = slides.length - 1;

const nextSlide = function () {
  if (currentSlide === maxSlide) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  slidePos(currentSlide);
  activeDot(currentSlide);
};
const pervSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide;
  } else {
    currentSlide--;
  }
  slidePos(currentSlide);
  activeDot(currentSlide);
};
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', pervSlide);
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') pervSlide();
});

dotsContainer.addEventListener('click', function (e) {
  if (!e.target.classList.contains('dots__dot')) return;
  const { slide } = e.target.dataset;

  slidePos(slide);
  activeDot(slide);
});
