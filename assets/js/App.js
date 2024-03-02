const apiKey = "YAxz5pEMAZQLJ8Ve1rdSAJUJqB3NnfhwHOwoINXT8bg";

const searchForm = document.querySelector("form");
const searchInput = document.getElementById("search-input");
const searchResultsContainer = document.querySelector(".search-results");
const showMoreButton = document.getElementById("show-more-button");
const imageContainer = document.getElementById("img-container");

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

let currentInput = "";
let currentPage = 1;

async function fetchImages() {
    currentInput = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${currentPage}&query=${currentInput}&client_id=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const imageResults = data.results;

    if (currentPage === 1) {
        searchResultsContainer.innerHTML = "";
        imageContainer.innerHTML = "";
        imageContainer.style.display = "flex";
    }

    imageResults.forEach((imageResult) => {
        const imageCard = document.createElement("div");
        imageCard.classList.add("card");

        const imageElement = document.createElement("img");
        imageElement.src = imageResult.urls.small;

        const imageLink = document.createElement("a");
        imageLink.href = imageResult.links.html;
        imageLink.target = "_blank";

        imageCard.appendChild(imageElement);
        imageCard.appendChild(imageLink);
        imageContainer.appendChild(imageCard);
    });

    currentPage++;
    if (currentPage > 1) {
        showMoreButton.style.display = "block";
    }
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    currentPage = 1;
    fetchImages();
});

showMoreButton.addEventListener("click", () => {
    fetchImages();
});
       
          

