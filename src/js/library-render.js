import Notiflix from 'notiflix';
import {
  getWatchedMovies,
  getQueueMovies,
  renderWatchedMovies,
} from './library';
import { headerLibrary } from './library';
const libBtnWatched = document.querySelector('.js-btn-watched');
const libBtnQueue = document.querySelector('.js-btn-queue');

headerLibrary.addEventListener('click', libraryEvents);

function libraryEvents(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }

  if (event.target.classList.contains('js-btn-watched')) {
    libBtnWatched.classList.add('btn-js-active');
    libBtnQueue.classList.remove('btn-js-active');

    renderWatchedMovies(getWatchedMovies[0]);
  }

  if (event.target.classList.contains('js-btn-queue')) {
    libBtnQueue.classList.add('btn-js-active');
    libBtnWatched.classList.remove('btn-js-active');

    renderWatchedMovies(getQueueMovies[0]);
  }
}
