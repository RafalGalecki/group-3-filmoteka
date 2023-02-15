import { getGenres, getMovieDetails } from './fetch';
import { refreshRendering } from './refreshrendering';
import { moviesContainer } from './cards-home';

import {
  getWatchedMovies,
  getQueueMovies,
  renderWatchedMovies,
} from './library';
import {
  watchedParsed,
  queueParsed,
  watchedMoviesContainer,
  headerLibrary,
} from './library';

const watchedHeaderBtn = document.querySelector('.js-btn-watched');
const queueHeaderBtn = document.querySelector('.js-btn-queue');

headerLibrary.addEventListener('click', libraryEvents);

function libraryEvents(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }

  if (event.target.classList.contains('js-btn-watched')) {
    renderWatchedMovies(getWatchedMovies[0]);
  }

  if (event.target.classList.contains('js-btn-queue')) {
    renderWatchedMovies(getQueueMovies[0]);
  }
}
