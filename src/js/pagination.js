'use strict';


function renderCardPaginator(count, selectedPage = 1, pageSize = 20) {
    const pages = Math.ceil(count / pageSize);
    const paginationContainer = document.querySelector(".pagination-container");
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= pages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.setAttribute("type", "button");
        pageBtn.classList.add("pagination__btn");
        pageBtn.innerText = i;
        if (i === Number(selectedPage)) {
            pageBtn.setAttribute("selected", true)
        }
        paginationContainer.append(pageBtn);

    }
    paginationContainer.addEventListener("click", (event) => {
        const selectedPage = event.target.value;
        const preloader = document.querySelector(".preloader");
        const cardsContainer = document.querySelector(".cards-container");

        preloader.classList.remove("hidden");
        paginationContainer.classList.add("hidden");
        cardsContainer.classList.add("hidden");

fetchJsonResponse(`http://swapiMOCK.dev/api/people/?page=${selectedPage}`)
  .then((response) => {
    renderCardPaginator(response["count"], selectedPage);
    renderMOVIECARDS(response["results"]);
  })
  .then(() => {
    setTimeout(() => {
      preloader.classList.add("hidden");
      paginationContainer.classList.remove("hidden");
      cardsContainer.classList.remove("hidden");
    }, 1500);
  });
    })
}

// put this function to fetch querry function like that:

// fetchJsonResponse("http://swapiMOCK.dev/api/people")
//   .then((response) => {
//     renderCardPaginator(response["count"]);
//     renderMOVIECARDS(response["results"]);
//   })
//   .then(() => {
//     preloader.classList.add("hidden");

//     document.querySelector("pagination-container").classList.remove("hidden");
//     document.querySelector("cards-container").classList.remove("hidden");
//   });

// in HTML div elements with classes
// preloader, pagination-container and cards-container
// they have class hidden