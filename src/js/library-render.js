import '../css/index.min.css';
import '../sass/cards-home.scss';
import '../sass/modal-card.scss';
import { getGenres, getMovieDetails} from './fetch';
import { refreshRendering } from './refreshrendering';
import { moviesContainer } from './cards-home';

import { getWatchedMovies, renderWatchedMovies } from './library';
import { watchedParsed, queueParsed, watchedMoviesContainer, headerLibrary } from './library';

const watchedHeaderBtn = document.querySelector('.js-btn-watched');
const queueHeaderBtn = document.querySelector('.js-btn-queue');

headerLibrary.addEventListener('click', libraryEvents);

function libraryEvents(event) {
    // if (e.target.nodeName !== 'BUTTON') {
    //     return;
    //   }

      if (event.target.classList.contains('js-btn-watched')) {
       
        renderWatchedMovies(getWatchedMovies[0]);
      }

      if (event.target.classList.contains('js-btn-queue')) {
    
        console.log('queue');
      }
}
