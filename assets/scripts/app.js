const Input = document.querySelector('.search-bar');
const SearchItemContainer = document.querySelector('.search-item-container');
const SearchDefault = document.querySelector('.search-default');

// Collect data from .article-item elements
const Datas = Array.from(document.querySelectorAll('.article-item')).map(Data => ({
    location: Data.dataset.location,
    title: Data.dataset.title,
    img: Data.dataset.img,
    category: Data.dataset.category,
    type: Data.dataset.type
}));

Input.addEventListener("input", () => {
    const query = Input.value.toLowerCase().trim();

    if (query === "") {
        SearchItemContainer.style.display = "none";
        return;
    } else {
        SearchItemContainer.style.display = "flex";
        gsap.fromTo(".search-item-container", {
            y: -10,
            duration: 1
        }, {
            y: 0,
            duration: 1
        })
    }

    const Matched = Datas.filter(Data => Data.title.toLowerCase().includes(query));

    if (Matched.length > 0) {
        const limited = Matched.slice(0, 5);

        SearchItemContainer.innerHTML = limited.map(Data => 
            `
            <a class="search-item-link" href="${Data.location}">
                <div class="search-item">
                    <img class="search-item-img" src="${Data.img}" alt="search-img">
                    <hr class="search-hr">
                    <div class="search-item-content-container">
                        <h5 class="search-title" style="font-weight: normal;">${Data.title}</h5>
                        <div class="search-category-type-container">
                            <span class="search-category">${Data.category}</span>
                            <span class="search-type">${Data.type}</span>
                        </div>
                    </div>
                </div>
            </a>
            `
        ).join('');
    } else {
        SearchItemContainer.innerHTML = `<p class="search-default" style="text-align:center; font-size: 0.8rem">No Data Found!</p>`;
    }
});

// Carousel of Works Section

    // <div class="works-carousel">
    //     <div class="works-slider">
    //         <div class="works-slide">
    //             <img class="works-img" src="./assets/img/works/rahouse.png" alt="portfolio-img">
    //             <a class="works-link highlighted" href="https://www.rahouse.com.np/" target="_blank">View Website<span></span></a>
    //         </div>
    //         <div class="works-slide">
    //             <img class="works-img" src="./assets/img/works/actionify.png" alt="portfolio-img">
    //             <a class="works-link highlighted" href="">View Website<span></span></a>
    //         </div>
    //         <div class="works-slide">
    //             <img class="works-img" src="./assets/img/works/actionify.png" alt="portfolio-img">
    //             <a class="works-link highlighted" href="">View Website<span></span></a>
    //         </div>
    //     </div>
    //     <button class="works-prev-btn"><svg fill="#ffffff" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.006 512.006" xml:space="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M388.419,475.59L168.834,256.005L388.418,36.421c8.341-8.341,8.341-21.824,0-30.165s-21.824-8.341-30.165,0 L123.586,240.923c-8.341,8.341-8.341,21.824,0,30.165l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251 c5.461,0,10.923-2.091,15.083-6.251C396.76,497.414,396.76,483.931,388.419,475.59z"></path> </g> </g> </g></svg></button>
    //     <button class="works-next-btn"><svg fill="#ffffff" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.006 512.006" xml:space="preserve" stroke="#ffffff" transform="rotate(180)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M388.419,475.59L168.834,256.005L388.418,36.421c8.341-8.341,8.341-21.824,0-30.165s-21.824-8.341-30.165,0 L123.586,240.923c-8.341,8.341-8.341,21.824,0,30.165l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251 c5.461,0,10.923-2.091,15.083-6.251C396.76,497.414,396.76,483.931,388.419,475.59z"></path> </g> </g> </g></svg></button>
    // </div>

    const slider = document.querySelector(".works-slider");
const slides = document.querySelectorAll(".works-slide");
const prevBtn = document.querySelector(".works-prev-btn");
const nextBtn = document.querySelector(".works-next-btn");
const dotsContainer = document.querySelector(".works-dots");

let index = 0;
let interval;
const slideCount = slides.length;

// Create dots
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
      void dot.offsetWidth; // restart animation
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

// Auto-slide every 3s
function startInterval() {
  interval = setInterval(nextSlide, 3000);
}
function resetInterval() {
  clearInterval(interval);
  startInterval();
}

startInterval();

// Swipe support
let startX = 0;
slider.addEventListener("touchstart", e => startX = e.touches[0].clientX);
slider.addEventListener("touchend", e => {
  let diff = e.changedTouches[0].clientX - startX;
  if (diff > 50) prevSlide();
  else if (diff < -50) nextSlide();
});










//Footer Current Year

document.querySelector('.current-year').textContent = new Date().getFullYear();

       