const accessKey = "YAxz5pEMAZQLJ8Ve1rdSAJUJqB3NnfhwHOwoINXT8bg";
const imgContainer = document.getElementById("img-container");
const showMore = document.getElementById("show-more-button");

let page = 1;

async function searchImages(query) {
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const results = data.results;

        if (page === 1) {
            imgContainer.innerHTML = "";
            imgContainer.style.display = "flex";
        }

        results.forEach((result) => {
            const card = document.createElement("div");
            card.classList.add("card");

            const image = document.createElement("img");
            image.src = result.urls.small;

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";

            // Append the image to the link before appending it to the card
            imageLink.appendChild(image);

            card.appendChild(imageLink);
            imgContainer.appendChild(card);
        });

        page++;
        if (page > 1) {
            showMore.style.display = "block";
        }
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

const formEl = document.getElementById("search-form");
const inputEl = document.getElementById("search-input");

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages(inputEl.value);
});

showMore.addEventListener("click", () => {
    searchImages(inputEl.value);
});

function onClickLink(query) {
    page = 1;
    searchImages(query);
}
