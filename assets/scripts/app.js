window.addEventListener("DOMContentLoaded", () => {

  setTimeout(() => {
    document.querySelector("#smooth-wrapper").classList.add('loaded');
    document.querySelector("html").classList.add('show');
    document.querySelector('.loader-container').style.display = "none";
  }, 2000)

  //Light/Dark Mode Toggle
  const ToggleBtn = document.querySelector('.toggle-btn');
  const DarkModeIcon = document.querySelector('.dark-mode-icon');
  const LightModeIcon = document.querySelector('.light-mode-icon');
  const Logo = document.querySelector('.logo-icon');

  function toggleTheme() {
    const root = document.documentElement;
    const current = getComputedStyle(root).getPropertyValue('--black');

    if(current === "hsl(0, 0%, 5%)") {
      root.style.setProperty('--black', 'hsl(0, 0%, 100%)');
      root.style.setProperty('--white', 'hsl(0, 0%, 5%)');
      root.style.setProperty('--black-8', 'hsl(0, 0%, 92%)');
      root.style.setProperty('--white-8', 'hsl(0, 0%, 8%)');
      root.style.setProperty('--black-10', 'hsl(0, 0%, 90%)');
      root.style.setProperty('--white-10', 'hsl(0, 0%, 10%)');
      root.style.setProperty('--white-rgb', '0, 0, 0');
    }
    else {
      root.style.setProperty('--black', 'hsl(0, 0%, 5%)');
      root.style.setProperty('--white', 'hsl(0, 0%, 100%)');
      root.style.setProperty('--black-8', 'hsl(0, 0%, 8%)');
      root.style.setProperty('--white-8', 'hsl(0, 0%, 92%)');
      root.style.setProperty('--black-10', 'hsl(0, 0%, 10%)');
      root.style.setProperty('--white-10', 'hsl(0, 0%, 90%)');
      root.style.setProperty('--white-rgb', '255, 255, 255')
    }
  };

  ToggleBtn.addEventListener("click", () => {
    if(LightModeIcon.style.display === "none") {
      ToggleBtn.style.translate = "30px 0px";
      LightModeIcon.style.display = "flex";
      DarkModeIcon.style.display = "none";
      Logo.src = "assets/img/logo-black.png";
      toggleTheme();
    }
    else {
      ToggleBtn.style.translate = "0px 0px";
      LightModeIcon.style.display = "none";
      DarkModeIcon.style.display = "flex";
      Logo.src = "assets/img/logo-white.jpg";
      toggleTheme();
    }
  });

  // Navigation's Search Bar

  const Inputs = document.querySelectorAll('.search-bar');
  const SearchItemContainers = document.querySelectorAll('.search-item-container');
  const SearchDefault = document.querySelector('.search-default');
  const HeroContentContainer = document.querySelector('.hero-content-container');

  async function initSearch() {
    const res = await fetch("/assets/data/articles.json");
    const Datas = await res.json();

    Inputs.forEach(Input => {
      Input.addEventListener("input", () => {
      const query = Input.value.toLowerCase().trim();
      
      if (query === "") {
          SearchItemContainers.forEach(SearchItemContainer => {SearchItemContainer.style.display = "none";
          return;})
        } else {
          SearchItemContainers.forEach(SearchItemContainer => {SearchItemContainer.style.display = "flex";
          gsap.fromTo(".search-item-container", {
              y: -10,
              duration: 1
          }, {
              y: 0,
              duration: 1
          })});

      const Matched = Datas.filter(Data => Data.title.toLowerCase().includes(query) || Data.tags[0].toLowerCase().includes(query) || Data.tags[1].toLowerCase().includes(query));

      if (Matched.length > 0) {
          const limited = Matched.slice(0, 5);

          SearchItemContainers.forEach(SearchItemContainer => {
            SearchItemContainer.innerHTML = limited.map(Data =>
              `
              <a class="search-item-link" href="${Data.url}">
                  <div class="search-item">
                      <img class="search-item-img" src="${Data.img}" alt="search-img">
                      <div class="search-item-content-container">
                          <h5 class="search-title">${Data.title}</h5>
                          <div class="search-category-type-container">
                              <span class="search-category">${Data.tags[0]}</span>;
                              <span class="search-type">${Data.tags[1]}</span>;
                          </div>
                      </div>
                  </div>
              </a>
              `
          ).join('');})
      } else {
          SearchItemContainers.forEach(SearchItemContainer => {SearchItemContainer.innerHTML = `<p class="search-default" style="text-align:center; font-size: 0.8rem">No Data Found!</p>`;
      })}}})})};
  initSearch();

  window.addEventListener("resize", () => {
    if(window.innerWidth < 950) {
      document.querySelector('.search-bar-big').style.display = "none";
    }
    else {
      document.querySelector('.search-bar-big').style.display = "flex";
    }
  })

  const SearchBigBtn = document.querySelector('.search-btn-big');
  const SearchBarSmallContainer = document.querySelector('.search-bar-container-small');

    SearchBigBtn.addEventListener("click", () => {
      if(window.innerWidth < 950) {
      SearchBarSmallContainer.style.transition = "all 1s ease-in";
      SearchBarSmallContainer.classList.toggle("active");
      }});

  //Footer's Current Year

  document.querySelector('.current-year').textContent = new Date().getFullYear();    

  // Works Section's Carousel

  const slider = document.querySelector(".works-slider");
  const slides = document.querySelectorAll(".works-slide");
  const prevBtn = document.querySelector(".works-prev-btn");
  const nextBtn = document.querySelector(".works-next-btn");
  const dotsContainer = document.querySelector(".works-dots");

  let index = 0;
  let interval;
  const slideCount = slides.length;

  slides.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
  const dots = document.querySelectorAll(".dot");

  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.remove("active");
      dot.style.setProperty("--progress", "0%");
      if (i === index) {
        void dot.offsetWidth;
        dot.classList.add("active");
      }
    });
  }

  function goToSlide(i) {
    index = (i + slideCount) % slideCount;
    slider.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
    resetInterval();
  }

  function nextSlide() { goToSlide(index + 1); }
  function prevSlide() { goToSlide(index - 1); }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  function startInterval() {
    interval = setInterval(nextSlide, 3000);
  }
  function resetInterval() {
    clearInterval(interval);
    startInterval();
  }

  startInterval();

  let startX = 0;
  slider.addEventListener("touchstart", e => startX = e.touches[0].clientX);
  slider.addEventListener("touchend", e => {
    let diff = e.changedTouches[0].clientX - startX;
    if (diff > 50) prevSlide();
    else if (diff < -50) nextSlide();
  });

  slider.addEventListener("click", e => startX = e.clientX);
  slider.addEventListener("click", e => {
    let comp = e.layerX;
    if (comp > 50) prevSlide();
    else if (comp < -50) nextSlide();
  });


  //Go To Top Link Visibility

  const GoToTopBtn = document.querySelector('.go-to-top');
  const ScrollLimit = window.innerHeight / 2;

  document.addEventListener('scroll', () => {
    scrollY >= ScrollLimit ? GoToTopBtn.style.display = "flex" : GoToTopBtn.style.display = "none";
  });

});









       