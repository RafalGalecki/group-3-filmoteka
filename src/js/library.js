import '../css/index.min.css';
import '../sass/cards-home.scss';
import '../sass/modal-card.scss';
import { getGenres, getMovieDetails} from './fetch';
import { refreshRendering } from './refreshrendering';
import { moviesContainer } from './cards-home';


const watchedMoviesContainer = document.querySelector('.cards-watched-container');
// const watchedHeaderBtn = document.querySelector('#watched');
// const queueHeaderBtn = document.querySelector('#queue');

const LOCALSTORAGE_WATCHED = "watched";
const LOCALSTORAGE_QUE = "queue";

const watched = localStorage.getItem(LOCALSTORAGE_WATCHED) || "";
const queue = localStorage.getItem(LOCALSTORAGE_QUE) || "";

const watchedParsed = JSON.parse(watched);
const queueParsed = JSON.parse(watched);


console.log(watchedParsed);


const headerHome = document.querySelector('.header-home');
const headerLibrary = document.querySelector('.header-library');
const libraryLink = document.querySelector('#library');
const homeLink = document.querySelector('#home');
//const cardsHome = document.querySelector('.cards-container');
const cardsLibraryWatched = document.querySelector('.cards-watched-container');
const cardsLibraryQueue = document.querySelector('.cards-queue-container');


export {watchedParsed, queueParsed, watchedMoviesContainer, headerLibrary };

libraryLink.addEventListener('click', () => {
    headerHome.classList.add('visually-hidden');
    moviesContainer.classList.add('visually-hidden');
    headerLibrary.classList.remove('visually-hidden');
    cardsLibraryWatched.classList.remove('visually-hidden');
});

homeLink.addEventListener('click', () => {
    headerHome.classList.remove('visually-hidden');
    moviesContainer.classList.remove('visually-hidden');
    headerLibrary.classList.add('visually-hidden');
    cardsLibraryWatched.classList.add('visually-hidden');
    
} )

let watchedMovies = [];

export const getWatchedMovies = watchedParsed.map(el => {
    getMovieDetails(el).then(result => {
        console.log(result.title);
        const singleMovie = result;
watchedMovies.push(singleMovie);
    }) 
    console.log(watchedMovies);
    return watchedMovies;
})



export function renderWatchedMovies(response) {
    refreshRendering();
    //get genres for movies
    getGenres().then(el => {
      const genres = el;
      generateCards(response);
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
      moviePicture.setAttribute(
        'onerror',
        "this.src = 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'"
      );
      moviePicture.setAttribute('loading', 'lazy');
  
      let movieTitle = document.createElement('h2');
      movieTitle.classList.add('movie-card__title');
      movieTitle.textContent = singleMovie.title;
  
      let movieInfo = document.createElement('p');
      movieInfo.classList.add('movie-card__info');
      movieInfo.textContent = `${singleMovie.release_date.slice(0, 4)}`;
  
      watchedMoviesContainer.appendChild(movieWrapper);
      movieWrapper.append(moviePicture, movieTitle, movieInfo);
    }
  }

  














