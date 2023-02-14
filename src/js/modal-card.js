import '../sass/components/_modal-card.scss';
import { moviesContainer } from './cards-home';
import { getMovieDetails } from './fetch';
import { saveToWatched } from './localStorage';
import { saveToQue } from './localStorage';
import { movieID } from './fetch';
//import { merge } from 'lodash';

const modal = document.querySelector('.modal-card');

export const createModalCard = el => {
  const btnClose = document.createElement('button');

  btnClose.classList.add('btn', 'btn--close');
  btnClose.textContent = '✖';


  const modalImage = document.createElement('img');
  modalImage.classList.add('modal-card__img');
  modalImage.setAttribute(
    'src',
    `https://image.tmdb.org/t/p/w185${el.poster_path}`
  );
  modalImage.setAttribute('alt', `${el.title}`);

  const modalHeader = document.createElement('h2');
  modalHeader.classList.add('modal-card__title');
  modalHeader.textContent = el.title;

  const modalMovieInfoList = document.createElement('ul');
  modalMovieInfoList.classList.add('modal-card__list');

  const movieInfoTypes = [
    'Vote/Votes',
    'Popularity',
    'Original Title',
    'Genre',
  ];

  let genresDesc = el.genres.map(el => el.name);
  let movieInfoTypesData = [
    `${el.vote_count}`,
    `${el.popularity}`,
    `${el.original_title}`,
    `${genresDesc}`,
  ];

  movieInfoTypes.map((content, index) => {
    let movieInfoItem = document.createElement('li');
    movieInfoItem.classList.add('modal-card__list-item');
    movieInfoItem.textContent = content;

    let movieInfoDetails = document.createElement('span');
    movieInfoDetails.classList.add('modal-card__list-details');
    movieInfoDetails.textContent = movieInfoTypesData[index];

    if (index === 0) {
      let movieInfoDetails = document.createElement('span');
      movieInfoDetails.classList.add(
        'modal-card__list-details',
        'modal-card__list-details--avg-color'
      );
      movieInfoDetails.textContent = `${el.vote_average}`;

      movieInfoItem.append(movieInfoDetails);
    }

    modalMovieInfoList.appendChild(movieInfoItem);
    movieInfoItem.appendChild(movieInfoDetails);
  });

  const modalMovieAbout = document.createElement('h3');
  modalMovieAbout.classList.add('modal-card__movie-about');
  modalMovieAbout.textContent = 'ABOUT';

  const modalMovieDesc = document.createElement('p');
  modalMovieDesc.classList.add('modal-card__movie-desc');
  modalMovieDesc.textContent = el.overview;

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('modal-card__buttons');

  const modalBtnAddWatch = document.createElement('button');
  modalBtnAddWatch.classList.add('btn', 'btn__addToWatched');
  modalBtnAddWatch.textContent = 'ADD TO WATCHED';

  const modalBtnAddQue = document.createElement('button');
  modalBtnAddQue.classList.add('btn', 'btn__addToQue');
  modalBtnAddQue.textContent = 'ADD TO QUE';

  modal.append(
    btnClose,
    modalImage,
    modalHeader,
    modalMovieInfoList,
    modalMovieAbout,
    modalMovieDesc,
    btnWrapper
  );

  btnWrapper.append(modalBtnAddWatch, modalBtnAddQue);

  //Adding EvenListiner to watched and Que buttons
  //Adding logic for their textContent
  let watched = [];
  const watchedData = JSON.parse(localStorage.getItem('watched'));

  if (watchedData != null) {
    watched.push(...watchedData);
  }

  if (watched.includes(movieID)) {
    modalBtnAddWatch.textContent = 'REMOVE FROM WATCHED';
    modalBtnAddQue.textContent = 'ALREADY WATCHED';
  }

  modalBtnAddWatch.addEventListener('click', saveToWatched);

  let que = [];
  const queData = JSON.parse(localStorage.getItem('que'));

  if (queData != null) {
    que.push(...queData);
  }

  if (que.includes(movieID)) {
    modalBtnAddQue.textContent = 'REMOVE FROM QUE';
  }

  modalBtnAddQue.addEventListener('click', saveToQue);
};

const displayMovieInfo = async e => {
  const movie_id = e.target.parentElement.getAttribute('id');

  getMovieDetails(movie_id).then(el => {
    createModalCard(el);
    modal.parentElement.classList.toggle('is-hidden');
  });
};

function hideModal() {
  modal.parentElement.classList.add('is-hidden');
  modal.replaceChildren();

  //   modal.removeEventListener('click', hideModal);
  //   window.removeEventListener('keydown',hideModal)

}

moviesContainer.addEventListener('click', displayMovieInfo);

modal.addEventListener('click', el => {
  if (el.target.classList.contains('btn--close')) {
    hideModal();
  }
});

window.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    hideModal();
  }
});

modal.parentElement.addEventListener('click', el => {
  if (el.target.classList.contains('modal-container')) {
    hideModal();
  }
});
