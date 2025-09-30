window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
    document.querySelector("#smooth-wrapper").classList.add('loaded');
    document.querySelector("html").classList.add('show');
    document.querySelector('.loader-container').style.display = "none";
  }, 2000);

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
        Logo.src = "../../assets/img/logo-black.png";
        toggleTheme();
      }
      else {
        ToggleBtn.style.translate = "0px 0px";
        LightModeIcon.style.display = "none";
        DarkModeIcon.style.display = "flex";
        Logo.src = "../../assets/img/logo-white.jpg";
        toggleTheme();
      }
    });

// Navigation's Search Bar
const Inputs = document.querySelectorAll('.search-bar');
const SearchItemContainers = document.querySelectorAll('.search-item-container');
const SearchDefault = document.querySelector('.search-default');

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

        SearchItemContainers.forEach(SearchItemContainer => {SearchItemContainer.innerHTML = limited.map(Data => 
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
    })
}}})})};

initSearch();

const SearchBigBtn = document.querySelector('.search-btn-big');
const SearchBarSmallContainer = document.querySelector('.search-bar-container-small');

  SearchBigBtn.addEventListener("click", () => {
    if(window.innerWidth < 950) {
    SearchBarSmallContainer.style.transition = "all 1s ease-in";
    SearchBarSmallContainer.classList.toggle("active");
    }});

//Go To Top Link Visibility

const GoToTopBtn = document.querySelector('.go-to-top');
const ScrollLimit = window.innerHeight / 2;

document.addEventListener('scroll', () => {
  scrollY >= ScrollLimit ? GoToTopBtn.style.display = "flex" : GoToTopBtn.style.display = "none";
});

//Footer Current Year

document.querySelector('.current-year').textContent = new Date().getFullYear();
});