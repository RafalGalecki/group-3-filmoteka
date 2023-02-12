'use strict';
import axios from 'axios';
import { API_KEY, BASE_URL } from './fetch';
import { searchInput } from './search-form';
import { renderMovies } from './search-form';

export function renderCardPaginator(totalPages, selectedPage = 1) {
  const pages = totalPages;
  const paginationContainer = document.getElementById('pagination-numbers');
  paginationContainer.innerHTML = '';
  const buttonsLimit = 9;
  
  for (let i = 1; i <= pages; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.setAttribute('type', 'button');
    pageBtn.classList.add('pagination__btn');
    pageBtn.setAttribute('value', `${i}`);
    pageBtn.setAttribute('id', `${i}`);
    pageBtn.innerText = i;
    if (i === Number(selectedPage)) {
      pageBtn.setAttribute('selected', true);
    }
    paginationContainer.append(pageBtn);
  }

  const pageBtnFirst = document.getElementById('1');
  pageBtnFirst.classList.add('activebtn');

  paginationContainer.addEventListener('click', event => {
    //event.preventDefault();
    selectedPage = Number(event.target.value);

    console.log('event.target.id', event.target.id);

    const preloader = document.getElementById('preloader');
    //const cardsContainer = document.querySelector('.cards-container');

    preloader.classList.add('hidden');
    //paginationContainer.classList.add('hidden');
    //cardsContainer.classList.add('hidden');

    setActivePage(selectedPage);
    const urlForSearching = ''.concat(
      BASE_URL,
      'search/movie?api_key=',
      API_KEY,
      '&query=',
      searchInput,
      `&page=${selectedPage}`
    );

    axios
      .get(urlForSearching)
      .then(function (response) {
        // handle success

        renderMovies(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        // Notiflix.Notify.error(
        //   'We are sorry, but getting data is impossible in that moment'
        // );
      });
  });
}

// Page buttons logic


function setActivePage(currentPage) {
  const elementActive = document.querySelector('.activebtn');
  elementActive.classList.remove('activebtn');
  const activeBtn = document.getElementById(`${currentPage}`);
  activeBtn.classList.add('activebtn');
}
