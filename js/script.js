document.addEventListener('DOMContentLoaded', function () {
  // --- Hamburger Navigation ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const overlay = document.getElementById('overlay');
  const navItems = document.querySelectorAll('#nav-links a');

  hamburger?.addEventListener('click', () => {
    navLinks?.classList.toggle('show');
    navLinks?.classList.toggle('active');
    overlay?.classList.toggle('show');
  });

  overlay?.addEventListener('click', () => {
    navLinks?.classList.remove('show', 'active');
    overlay?.classList.remove('show');
  });

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks?.classList.remove('show', 'active');
      overlay?.classList.remove('show');
    });
  });

  // --- Image Slider (horizontal slide) ---
  const slides = document.querySelector('.slides');
  const slideImages = document.querySelectorAll('.slides img');
  const slideWidth = slideImages[0]?.clientWidth || 0;
  let currentIndex = 0;
  let autoSlideInterval = setInterval(showNextSlide, 3000);

  function showNextSlide() {
    currentIndex = (currentIndex + 1) % slideImages.length;
    slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  function showPrevSlide() {
    currentIndex = (currentIndex - 1 + slideImages.length) % slideImages.length;
    slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  const sliderButtons = document.querySelectorAll('.slider-button');
  sliderButtons.forEach(button => {
    button.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    button.addEventListener('mouseleave', () => autoSlideInterval = setInterval(showNextSlide, 3000));
  });

  document.querySelector('.next-button')?.addEventListener('click', () => {
    showNextSlide();
    restartAutoSlide();
  });
  document.querySelector('.prev-button')?.addEventListener('click', () => {
    showPrevSlide();
    restartAutoSlide();
  });

  function restartAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(showNextSlide, 3000);
  }

  // --- Dot Slider (fade/slideshow) ---
  const dotSlides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const dotPrev = document.querySelector('.slider-prev');
  const dotNext = document.querySelector('.slider-next');
  const dotSlider = document.querySelector('.slider-container');
  let dotIndex = 0;
  let dotInterval;

  function showDotSlide(index) {
    dotSlides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    dotSlides[index]?.classList.add('active');
    dots[index]?.classList.add('active');
    dotIndex = index;
  }

  function nextDotSlide() {
    showDotSlide((dotIndex + 1) % dotSlides.length);
  }

  function prevDotSlide() {
    showDotSlide((dotIndex - 1 + dotSlides.length) % dotSlides.length);
  }

  dotNext?.addEventListener('click', () => {
    nextDotSlide();
    restartDotSlider();
  });

  dotPrev?.addEventListener('click', () => {
    prevDotSlide();
    restartDotSlider();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showDotSlide(i);
      restartDotSlider();
    });
  });

  function startDotSlider() {
    dotInterval = setInterval(nextDotSlide, 3000);
  }

  function stopDotSlider() {
    clearInterval(dotInterval);
  }

  function restartDotSlider() {
    stopDotSlider();
    startDotSlider();
  }

  dotSlider?.addEventListener('mouseenter', stopDotSlider);
  dotSlider?.addEventListener('mouseleave', startDotSlider);

  // Initialize dot slider
  if (dotSlides.length) {
    showDotSlide(0);
    startDotSlider();
  }

  // --- Read More Button ---
  const readMoreBtn = document.getElementById('read-more-btn');
  const historyContent = document.querySelector('.history-content');

  readMoreBtn?.addEventListener('click', () => {
    historyContent?.classList.toggle('expanded');
    readMoreBtn.textContent = historyContent?.classList.contains('expanded') ? 'Read Less' : 'Read More';
  });

 

  // --- Scroll to Top Button ---
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = 'flex';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });

  window.scrollToTop = function () {
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  };
});
