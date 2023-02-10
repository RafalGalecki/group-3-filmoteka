import debounce from 'lodash.debounce';
import { getSearchedMovies, getGenres } from './fetch';
import { refreshRendering } from './refreshrendering';
import { moviesContainer } from './cards-home';

const DEBOUNCE_DELAY = 3000;

const form = document.querySelector('#search-form');
const handleSubmit = debounce(function (e) {
  e.preventDefault();
  const searchInput = e.target.value.trim();
  console.log('keywords are ', searchInput);
  refreshRendering();
  getSearchedMovies(searchInput);
  //renderMovies(res.data.results);
}, DEBOUNCE_DELAY);

form.addEventListener('input', handleSubmit);

// ATTENTION!
// cards rendering function should be separate to its own js file
export function renderMovies(response) {
  //get genres for movies
  getGenres().then(el => {
    const genres = el;
    console.log(genres);
    generateCards(response.data.results);
    // //get movies with genres description
    //   getInitialMovies().then(res => {
    //     const initialMovies = moviesData;

    //     console.log(res.data);

    //     generateCards(res.data.results);
    //   });
  });

  //create set of movie cards
  function generateCards(data) {
    data.map(el => {
      createMovieCard(el);
    });
  }
  //create single movie card element
  function createMovieCard(singleMovie) {
    let movieWrapper = document.createElement('div');
    movieWrapper.classList.add('movie-card');
    movieWrapper.setAttribute('id', singleMovie.id);

    //create full url for images
    let urlImg = `https://image.tmdb.org/t/p/w300${singleMovie.poster_path}`;

    let moviePicture = document.createElement('img');
    moviePicture.classList.add('movie-card__img');
    moviePicture.setAttribute('src', urlImg);
    moviePicture.setAttribute('alt', singleMovie.title);
    moviePicture.setAttribute('onerror', "this.src = 'display:none'");
    moviePicture.setAttribute('loading', 'lazy');

    let movieTitle = document.createElement('h2');
    movieTitle.classList.add('movie-card__title');
    movieTitle.textContent = singleMovie.title;

    let movieInfo = document.createElement('p');
    movieInfo.classList.add('movie-card__info');
    movieInfo.textContent = `${singleMovie.release_date.slice(0, 4)}`;

    moviesContainer.appendChild(movieWrapper);
    movieWrapper.append(moviePicture, movieTitle, movieInfo);
  }
}
