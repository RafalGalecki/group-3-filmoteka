'use strict';
'id';
import axios from 'axios';
import { API_KEY, BASE_URL } from './fetch';
import { searchInput } from './search-form';
import { renderMovies } from './search-form';

export function renderCardPaginator(totalPages, selectedPage = 1) {
  const pages = totalPages;
  const paginationContainer = document.getElementById('pagination-numbers');
  paginationContainer.innerHTML = '';

  // generate buttons according to a totalPages variable
  if (totalPages >= 2) {
    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement('button');
      pageBtn.setAttribute('type', 'button');
      //pageBtn.classList.add('visible');
      pageBtn.setAttribute('value', `${i}`);
      pageBtn.setAttribute('id', `page${i}`);
      pageBtn.innerText = i;
      // if (i === Number(selectedPage)) {
      //   pageBtn.setAttribute('selected', true);
      // }
      paginationContainer.append(pageBtn);
    }
    // handle how many buttons to show --------------------
    limitDisplayedButtons(totalPages);

    // first button
    // on first search load(page 1) it makes button 1 active
    const firstBtn = document.getElementById('page1');
    //firstBtn.classList.remove('visible');
    if (firstBtn) {
      firstBtn.classList.add('activebtn');
    }
    // last button
    const lastBtn = document.getElementById(`page${totalPages}`);

    // generate Arrow Prev & Next buttons ------------------------
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

    // generate ellipsis (...) buttons --------------------

    const backwardEllipsisBtn = document.createElement('button');
    backwardEllipsisBtn.setAttribute('type', 'button');
    backwardEllipsisBtn.setAttribute('value', '');
    backwardEllipsisBtn.setAttribute('id', 'prevStepButton');
    backwardEllipsisBtn.classList.add('hidden');
    backwardEllipsisBtn.innerHTML = '...';
    backwardEllipsisBtn.style.backgroundColor = '#C4B454';

    firstBtn.after(backwardEllipsisBtn);

    const forwardEllipsisBtn = document.createElement('button');
    forwardEllipsisBtn.setAttribute('type', 'button');
    forwardEllipsisBtn.setAttribute('value', '');
    forwardEllipsisBtn.setAttribute('id', 'nextStepButton');
    forwardEllipsisBtn.innerHTML = '...';
    forwardEllipsisBtn.style.backgroundColor = '#C4B454';

    lastBtn.before(forwardEllipsisBtn);
  }
  console.log('totalpages is', totalPages);

  // LISTENER ---------------------------------------
  //////////////////////////////////////////////////////

  paginationContainer.addEventListener('click', event => {
    event.preventDefault();
    ///////////////////////////////////////////////////

    // Prev and Next buttons logic --------------------------
    // prev & next button declarations
    const prevBtn = document.getElementById('prevButton');
    const nextBtn = document.getElementById('nextButton');
    // backward & forward Ellipsis button declarations
    const backwardEllipsisBtn = document.getElementById('prevStepButton');
    const forwardEllipsisBtn = document.getElementById('nextStepButton');

    // placeholder page button
        
    // handle 'previous' button
    if (event.target.id === 'prevButton') {
      if (selectedPage === 1) {
        return;
      } else {
        console.log('PREV', selectedPage);
        selectedPage -= 1;
        console.log('PREV after', selectedPage);
        if (totalPages > 6 && selectedPage < totalPages - 5) {
          let hideButton = document.getElementById(`page${selectedPage + 5}`);
          hideButton.classList.add('hidden');
        }
        let showButton = document.getElementById(`page${selectedPage}`);
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
          let hideButton = document.getElementById(`page${selectedPage - 5}`);
          hideButton.classList.add('hidden');
        }
        let showButton = document.getElementById(`page${selectedPage}`);
        showButton.classList.add('hidden');
        showButton.classList.remove('hidden');

        nextBtn.setAttribute('value', `${selectedPage}`);
      }
    }

    // Ellipsis 5-page step logic -----------------------------
    if (event.target.id === 'nextStepButton') {
      if (selectedPage > totalPages - 6) {
        return;
      } else {

        selectedPage += 5;
        for (let i = selectedPage; i <= selectedPage + 5; i++) {
          let placeholderBtn = document.getElementById(`page${i}`);
          console.log('placeholder', placeholderBtn);
          placeholderBtn.classList.remove('hidden');
        }
        // const show5thButon = document.getElementById(`page${selectedPage + 5}`);
        // show5thButon.classList.add('activebtn');
        for (i = 2; i <= selectedPage - 5; i++) {
          let placeholderBtn = document.getElementById(`page${i}`);
          placeholderBtn.classList.add('hidden');
          
        }

        console.log("WEW", selectedPage);
        forwardEllipsisBtn.setAttribute('value', `${selectedPage}`);
        
      }
    }
 console.log('Przed', selectedPage);
    // ATTENTION IT MUST BE HERE----------------------------
    selectedPage = Number(event.target.value);
    console.log("Po", selectedPage)
    // after that selected page = shown page

    // first & last logic---------------------------

    // first button
    const firstPageButton = document.getElementById('page1');
    if (event.target == firstPageButton && totalPages > 6) {
      for (i = 1; i <= 6; i++) {
        const buttonToShow = document.getElementById(`page${i}`);
        buttonToShow.classList.add('hidden');
        buttonToShow.classList.remove('hidden');
      }
      for (i = 7; i < totalPages; i++) {
        const buttonToHide = document.getElementById(`page${i}`);
        buttonToHide.classList.add('hidden');
      }
    }
    // last button
    const lastPageButton = document.getElementById(`page${totalPages}`);
    if (event.target == lastPageButton && totalPages > 6) {
      for (i = totalPages - 6; i <= totalPages; i++) {
        const buttonToShow = document.getElementById(`page${i}`);
        buttonToShow.classList.add('hidden');
        buttonToShow.classList.remove('hidden');
      }
      for (i = 2; i <= totalPages - 6; i++) {
        const buttonToHide = document.getElementById(`page${i}`);
        buttonToHide.classList.add('hidden');
      }
    }
    // Ellipsis buttons show/hide logic -------------------------

    if (Number(event.target.value) <= 5) {
      backwardEllipsisBtn.classList.add('hidden');

      forwardEllipsisBtn.classList.remove('hidden');
    }
    if (
      Number(event.target.value) > 5 &&
      Number(event.target.value) < totalPages - 5
    ) {
      backwardEllipsisBtn.classList.remove('hidden');
      forwardEllipsisBtn.classList.remove('hidden');
    }
    if (Number(event.target.value) >= totalPages - 5) {
      forwardEllipsisBtn.classList.add('hidden');

      backwardEllipsisBtn.classList.remove('hidden');
    }
    // Preloader ------------------------------
    const preloader = document.getElementById('preloader');

    preloader.classList.add('hidden');
    // set active page ---------------------------
    setActivePage(selectedPage);

    // create URL with selected page for searching -------
    const urlForSearching = ''.concat(
      BASE_URL,
      'search/movie?api_key=',
      API_KEY,
      '&query=',
      searchInput,
      `&page=${selectedPage}`
    );

    // axios fetch for searchin movies ----------------

    axios
      .get(urlForSearching)
      .then(function (response) {
        // handle success

        renderMovies(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        Notiflix.Notify.warning(
          'We are sorry, but getting data is impossible in that moment'
        );
      });
  });
}

// Page buttons logic

function setActivePage(currentPage) {
  const elementActive = document.querySelector('.activebtn');
  elementActive.classList.remove('activebtn');
  elementActive.classList.add('visible');
  const activeBtn = document.getElementById(`page${currentPage}`);
  activeBtn.classList.add('activebtn');
}

////// Limit page-numbered buttons displayed
function limitDisplayedButtons(totalPages) {
  if (totalPages > 7) {
    for (let i = 7; i < totalPages; i++) {
      const btnHidden = document.getElementById(`page${i}`);
      //btnHidden.classList.remove('visible');
      btnHidden.classList.add('hidden');
    }
  }
}
