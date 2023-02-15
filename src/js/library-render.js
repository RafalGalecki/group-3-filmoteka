
import {
  getWatchedMovies,
  getQueueMovies,
  renderWatchedMovies,
} from './library';
import {
  headerLibrary,
} from './library';

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
