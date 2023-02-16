'use strict';
import axios from 'axios';
import { API_KEY, BASE_URL } from './fetch';
import { searchInput } from './search-form';
import { renderMovies } from './search-form';

export function renderCardPaginator(totalPages, selectedPage = 1) {
  const pages = totalPages;
  const paginationContainer = document.getElementById('pagination-numbers');
  paginationContainer.innerHTML = '';

  if (totalPages >= 2) {
    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement('button');
      pageBtn.setAttribute('type', 'button');
      //pageBtn.classList.add('visible');
      pageBtn.setAttribute('value', `${i}`);
      pageBtn.setAttribute('id', `btn${i}`);
      pageBtn.innerText = i;
      if (i === Number(selectedPage)) {
        pageBtn.setAttribute('selected', true);
      }
      paginationContainer.append(pageBtn);
    }

    limitDisplayedButtons(totalPages);

    // first button
    // on first search load(page 1) it makes button 1 active
    const firstBtn = document.getElementById('btn1');
    //firstBtn.classList.remove('visible');
    if (firstBtn) {
      firstBtn.classList.add('activebtn');
    }
    // last button
    const lastBtn = document.getElementById(`btn${totalPages}`);

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
  }
  console.log('totalpages is', totalPages);

  // LISTENER ---------------------------------------
  //////////////////////////////////////////////////////

  paginationContainer.addEventListener('click', event => {
    event.preventDefault();

    // handle 'previous' button
    const prevBtn = document.getElementById('prevButton');
    const nextBtn = document.getElementById('nextButton');

    if (event.target.id === 'prevButton') {
      if (selectedPage === 1) {
        return;
      } else {
        console.log('PREV', selectedPage);
        selectedPage -= 1;
        console.log('PREV after', selectedPage);
        if (totalPages > 6 && selectedPage < totalPages - 5) {
          let hideButton = document.getElementById(`btn${selectedPage + 5}`);
          hideButton.classList.add('hidden');
        }
        let showButton = document.getElementById(`btn${selectedPage}`);
        showButton.classList.add('hidden');
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
        if (totalPages > 6 && selectedPage > 6) {
          let hideButton = document.getElementById(`btn${selectedPage - 5}`);
          hideButton.classList.add('hidden');
        }
        let showButton = document.getElementById(`btn${selectedPage}`);
        showButton.classList.add('hidden');
        showButton.classList.remove('hidden');

        nextBtn.setAttribute('value', `${selectedPage}`);
      }
    }

    // ATTENTION IT MUST BE HERE----------------------------
    selectedPage = Number(event.target.value);
    // after that selected page = shown page

    // first & last logic
    //first button
    const firstPageButton = document.getElementById('btn1');
    if (event.target == firstPageButton && totalPages > 6) {
      for (i = 1; i < 6; i++) {
        const buttonToShow = document.getElementById(`btn${i}`);
        buttonToShow.classList.add('hidden');
        buttonToShow.classList.remove('hidden');
      }
      for (i = 6; i < totalPages; i++) {
        const buttonToHide = document.getElementById(`btn${i}`);
        buttonToHide.classList.add('hidden');
      }
    }
    // last button
    const lastPageButton = document.getElementById(`btn${totalPages}`);
    if (event.target == lastPageButton && totalPages > 6) {
      for (i = totalPages - 6; i <= totalPages; i++) {
        const buttonToShow = document.getElementById(`btn${i}`);
        buttonToShow.classList.add('hidden');
        buttonToShow.classList.remove('hidden');
      }
      for (i = 2; i <= totalPages - 6; i++) {
        const buttonToHide = document.getElementById(`btn${i}`);
        buttonToHide.classList.add('hidden');
      }
    }

    const preloader = document.getElementById('preloader');

    preloader.classList.add('hidden');

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
  const activeBtn = document.getElementById(`btn${currentPage}`);
  activeBtn.classList.add('activebtn');
}

////// Limit page-numbered buttons displayed
function limitDisplayedButtons(totalPages) {
  if (totalPages > 7) {
    for (let i = 7; i < totalPages; i++) {
      const btnHidden = document.getElementById(`btn${i}`);
      //btnHidden.classList.remove('visible');
      btnHidden.classList.add('hidden');
    }
  }
}
