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
        SearchItemContainer.innerHTML = `<p class="search-default" style="text-align:center;">No Data Found!</p>`;
    }
});

// Carousel of Works Section

const Slider = 