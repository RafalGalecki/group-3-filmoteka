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

  //Arrow buttons prev and next
  const prevBtn = document.createElement('button');
  prevBtn.setAttribute('type', 'button');
  prevBtn.setAttribute('value', '');
  prevBtn.setAttribute('id', 'prevButton');
  prevBtn.innerHTML = '&lt;';
  prevBtn.style.backgroundColor = '#ff6b08';
  paginationContainer.prepend(prevBtn);

  const nextBtn = document.createElement('button');
  nextBtn.setAttribute('type', 'button');
  nextBtn.setAttribute('value', '');
  nextBtn.setAttribute('id', 'nextButton');
  nextBtn.innerHTML = '&gt;';
  nextBtn.style.backgroundColor = '#ff6b08';
  paginationContainer.append(nextBtn);

  // on first search load (page 1) it makes button 1 active
  const pageBtnFirst = document.getElementById('1');
  pageBtnFirst.classList.add('activebtn');

  paginationContainer.addEventListener('click', event => {
    //event.preventDefault();
    //disableButtons(prevBtn, nextBtn, selectedPage, totalPages);

    if (event.target.id == 'prevButton') {
      if (selectedPage === 1) {
        return;
      } else {
        console.log('PREV', selectedPage);
        selectedPage -= 1;
        console.log('PREV after', selectedPage);
        prevBtn.setAttribute('value', `${selectedPage}`);
      }
    }
    if (event.target.id == 'nextButton') {
      if (selectedPage === totalPages) {
        return;
      } else {
        console.log('NEXT', selectedPage);
        selectedPage += 1;
        console.log('NEXT after', selectedPage);
        nextBtn.setAttribute('value', `${selectedPage}`);
      }
    }

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

function disableButtons(prevBtn, nextBtn, selectedPage, totalpages) {
  //const prevBtn = document.getElementById('prevButton');
  //const nextBtn = document.getElementById('nextButton');

  prevBtn.setAttribute('disabled', false);
  nextBtn.setAttribute('disabled', false);
  if (selectedPage == 1) {
    prevBtn.setAttribute('disabled', true);
  }
  if (selectedPage == totalpages) {
    nextBtn.setAttribute('disabled', true);
  }
}
