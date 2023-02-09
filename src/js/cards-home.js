import '../sass/cards-home.scss';
import { getInitialMovies, getGenres } from './fetch';

const moviesContainer = document.querySelector('.cards-container');

function loadMovies() {
  getInitialMovies().then(res => {
    const initialMovies = res.data.results;
    console.log(initialMovies);
    generateCards(initialMovies);
  });

  //get genres for movies
  getGenres().then(el => {
    console.log(el);
    return el;
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

    //create full url for images
    let urlImg = `https://image.tmdb.org/t/p/w300${singleMovie.poster_path}`;

    let moviePicture = document.createElement('img');
    moviePicture.classList.add('movie-card__img');
    moviePicture.setAttribute('src', urlImg);
    moviePicture.setAttribute('alt', singleMovie.title);
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

document.addEventListener('DOMContentLoaded', loadMovies());
