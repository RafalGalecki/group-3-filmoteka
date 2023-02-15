'use strict';
import axios from 'axios';
import { API_KEY, BASE_URL } from './fetch';
import { searchInput } from './search-form';
import { renderMovies } from './search-form';

export function renderCardPaginator(totalPages, selectedPage = 1) {
  const pages = totalPages;
  const paginationContainer = document.getElementById('pagination-numbers');
  paginationContainer.innerHTML = '';
 

  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.setAttribute('type', 'button');
    //pageBtn.classList.add('visible');
    pageBtn.setAttribute('value', `${i}`);
    pageBtn.setAttribute('id', `${i}`);
    pageBtn.innerText = i;
    if (i === Number(selectedPage)) {
      pageBtn.setAttribute('selected', true);
    }
    paginationContainer.append(pageBtn);
  }

  limitDisplayedButtons(totalPages);

  // first button
  // on first search load(page 1) it makes button 1 active
  const firstBtn = document.getElementById('1');
  //firstBtn.classList.remove('visible');
  firstBtn.classList.add('activebtn');

  // last button
  const lastBtn = document.getElementById(`${totalPages}`);

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

  // ... buttons

  const prevStepBtn = document.createElement('span');
  //prevStepBtn.setAttribute('type', 'button');
  prevStepBtn.setAttribute('value', '');
  prevStepBtn.setAttribute('id', 'prevStepButton');
  //prevStepBtn.classList.add('hidden');
  prevStepBtn.innerHTML = '...';
  prevStepBtn.style.backgroundColor = '#C4B454';

  firstBtn.after(prevStepBtn);

  const nextStepBtn = document.createElement('span');
  //nextStepBtn.setAttribute('type', 'button');
  nextStepBtn.setAttribute('value', '');
  nextStepBtn.setAttribute('id', 'nextStepButton');
  nextStepBtn.innerHTML = '...';
  nextStepBtn.style.backgroundColor = '#C4B454';

  lastBtn.before(nextStepBtn);
  if (selectedPage > totalPages - 5) {
    nextStepBtn.classList.toggle('hidden');
  }
  // LISTENER ---------------------------------------
  //////////////////////////////////////////////////////

  paginationContainer.addEventListener('click', event => {
    event.preventDefault();

    

    // handle 'previous' button

    if (event.target) {
      console.log(
        'NAJPIERW: ',
        'id:',
        event.target.id,
        'selectedPage: ',
        selectedPage
      );
    }
    if (event.target.id === 'prevButton') {
      if (selectedPage === 1) {
        return;
      } else {
        console.log('PREV', selectedPage);
        selectedPage -= 1;
        console.log('PREV after', selectedPage);
        if (selectedPage < totalPages - 6) {
          let hideButton = document.getElementById(`${selectedPage + 5}`);
          hideButton.classList.add('hidden');
        }
        let showButton = document.getElementById(`${selectedPage}`);
        showButton.classList.remove('hidden');

        prevBtn.setAttribute('value', `${selectedPage}`);
      }
    }
    // handle 'next' button
    if (event.target.id == 'nextButton') {
      if (selectedPage === totalPages) {
        return;
      } else {
        console.log('NEXT before', selectedPage);

        selectedPage += 1;
        console.log('NEXT after', selectedPage);
        if (selectedPage > 6) {
          let hideButton = document.getElementById(`${selectedPage - 5}`);
          hideButton.classList.add('hidden');
        }
        let showButton = document.getElementById(`${selectedPage}`);
        showButton.classList.remove('hidden');

        nextBtn.setAttribute('value', `${selectedPage}`);
      }
    }

    // ATTENTION IT MUST BE HERE----------------------------
    selectedPage = Number(event.target.value);
    // after that selected page = shown page

    // first & last logic
    //first button
    const firstPageButton = document.getElementById('1');
    if (event.target == firstPageButton) {
      for (i = 1; i < 6; i++) {
        const buttonToShow = document.getElementById(`${i}`);
        buttonToShow.classList.add('hidden');
        buttonToShow.classList.remove('hidden');
      }
      for (i = 6; i < totalPages; i++) {
        const buttonToHide = document.getElementById(`${i}`);
        buttonToHide.classList.add('hidden');
      }
    }
    // last button
    const lastPageButton = document.getElementById(`${totalPages}`);
    if (event.target == lastPageButton) {
      for (i = totalPages - 6; i <= totalPages; i++) {
        const buttonToShow = document.getElementById(`${i}`);
        buttonToShow.classList.add('hidden');
        buttonToShow.classList.remove('hidden');
      }
      for (i = 2; i <= totalPages - 6; i++) {
        const buttonToHide = document.getElementById(`${i}`);
        buttonToHide.classList.add('hidden');
      }
    }

    if (event.target) {
      console.log(
        'PO ZDEFINIOWANIU SELECTED: ',
        'id:',
        event.target.id,
        'selectedPage: ',
        selectedPage
      );
    }
    // // handle ... 'previous' button (...)
    // if (Number(event.target.value) > 5 || selectedPage > 5) {
    //   prevStepBtn.classList.remove('hidden');
    // }
    // if (Number(event.target.value) <= 5 || selectedPage <= 5) {
    //   prevStepBtn.classList.add('hidden');
    // }
    // // handle ... 'next' button (...)
    // if (
    //   Number(event.target.value) >= totalPages - 5 ||
    //   selectedPage >= totalPages - 5
    // ) {
    //   nextStepBtn.classList.add('hidden');
    // }
    // if (
    //   Number(event.target.value) < totalPages - 5 ||
    //   selectedPage < totalPages - 5
    // ) {
    //   nextStepBtn.classList.remove('hidden');
    // }

    if (event.target) {
      console.log(
        'PO ZDEFINIOWANIU TRZYKROPKÓW: ',
        'id:',
        event.target.id,
        'selectedPage: ',
        selectedPage
      );
    }

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

// function disableButtons(prevBtn, nextBtn, selectedPage, totalpages) {
//   if (selectedPage == 1) {
//     prevBtn.setAttribute('disabled', true);
//   }
//   prevBtn.setAttribute('disabled', false);
//   if (selectedPage == totalpages) {
//     nextBtn.setAttribute('disabled', true);
//   }
//   nextBtn.setAttribute('disabled', false);
// }

// Limit page-numbered buttons displayed

function limitDisplayedButtons(totalPages) {
  if (totalPages > 7) {
    for (let i = 7; i < totalPages; i++) {
      const btnHidden = document.getElementById(`${i}`);
      //btnHidden.classList.remove('visible');
      btnHidden.classList.add('hidden');
    }
  }
}
