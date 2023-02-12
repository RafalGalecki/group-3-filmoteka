import '../sass/cards-home.scss';
import '../sass/modal-card.scss';
import { getInitialMovies, getGenres, getMovieDetails } from './fetch';

export const moviesContainer = document.querySelector('.cards-container');

export function loadMovies() {
  //get genres for movies
  getGenres().then(el => {
    const genres = el;
    console.log(genres);

    //get movies with genres description
    getInitialMovies().then(res => {
      const initialMovies = res.data.results;

      console.log(res.data.results);

      generateCards(initialMovies, genres);
    });
  });

  //create set of movie cards
  function generateCards(data, genres) {
    data.map(movie => {
      const genresDesc = getGenresDescription(movie, genres);
      createMovieCard(movie, genresDesc);
    });
  }

  //generating array of genres description basing on array of objects from genres fetch function and genre_ids from movie
  function getGenresDescription(movie, genres) {
    return genres.reduce((acc, el) => {
      if (movie.genre_ids.includes(el.id)) {
        acc.push(el.name);
      }
      return acc;
    }, []);
  }

  //create single movie card element
  function createMovieCard(singleMovie, genresDesc) {

    let movieWrapper = document.createElement('div');
    movieWrapper.classList.add('movie-card');
    movieWrapper.setAttribute('id', singleMovie.id);

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

    let movieInfo = document.createElement('span');
    movieInfo.classList.add('movie-card__info');

    movieInfo.textContent = `${genresDesc} | ${singleMovie.release_date.slice(0, 4)}`;

    let movieRating = document.createElement('span');
    movieRating.classList.add('movie-card__rating');
    movieRating.textContent = singleMovie.vote_average;

    //adding elements to HTML
    moviesContainer.appendChild(movieWrapper);
    movieWrapper.append(moviePicture, movieTitle, movieInfo, movieRating);
  }
}

document.addEventListener('DOMContentLoaded', loadMovies());
