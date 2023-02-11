'use strict';

import { getSearchedMovies } from "./fetch";
import { searchInput } from "./search-form";



export function renderCardPaginator(totalPages, selectedPage = 1) {
  const pages = totalPages;
  const paginationContainer = document.querySelector('.pagination-container');
  paginationContainer.innerHTML = '';

  for (let i = 1; i <= pages; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.setAttribute('type', 'button');
    pageBtn.classList.add('pagination__btn');
    pageBtn.setAttribute('value', `${i}`)
    pageBtn.innerText = i;
    if (i === Number(selectedPage)) {
      pageBtn.setAttribute('selected', true);
    }
    paginationContainer.append(pageBtn);
  }
  paginationContainer.addEventListener('click', event => {
    //event.preventDefault();
    let selectedPage = Number(event.target.value);
    const preloader = document.getElementById('preloader');
    const cardsContainer = document.querySelector('.cards-container');

    preloader.classList.add('hidden');


    console.log('!!!searchInput is :', searchInput);
    console.log('!!!selectedPage is :', selectedPage);
    getSearchedMovies(searchInput, selectedPage);
  });
}

