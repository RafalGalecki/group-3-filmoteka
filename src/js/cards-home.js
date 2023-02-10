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

      console.log(res.data);

      generateCards(initialMovies);
    });
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

//modal
const modal = document.querySelector('.modal-card');

const createModalCard = el => {
  const btnClose = document.createElement('button');
  btnClose.classList.add('btn--close');
  btnClose.textContent = 'close';

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

  const modalMovieInfo = document.createElement('ul');
  modalMovieInfo.classList.add('modal-card__list');

  const movieInfoTypes = [
    'Vote/Votes',
    'Popularity',
    'Original Title',
    'Genre',
  ];

  movieInfoTypes.map(content => {
    let movieInfoItem = document.createElement('li');
    movieInfoItem.classList.add('modal-card__list-item');
    movieInfoItem.textContent = content;

    let movieInfoDetails = document.createElement('span');
    movieInfoDetails.classList.add('modal-card__list-details');

    modalMovieInfo.appendChild(movieInfoItem);
    movieInfoItem.appendChild(movieInfoDetails);
  });

  const modalMovieAbout = document.createElement('h3');
  modalMovieAbout.classList.add('modal-card__movie-about');
  modalMovieAbout.textContent = 'ABOUT';

  const modalMovieDesc = document.createElement('p');
  modalMovieDesc.classList.add('modal-card__movie-desc');
  modalMovieDesc.textContent = el.overview;

  const modalBtnAddWatch = document.createElement('button');
  modalBtnAddWatch.classList.add('btn');
  modalBtnAddWatch.textContent = 'ADD TO WATCHED';

  const modalBtnAddQue = document.createElement('button');
  modalBtnAddQue.classList.add('btn');
  modalBtnAddQue.textContent = 'ADD TO QUE';

  modal.append(
    btnClose,
    modalImage,
    modalHeader,
    modalMovieInfo,
    modalMovieAbout,
    modalMovieDesc,
    modalBtnAddWatch,
    modalBtnAddQue
  );
};

const displayMovieInfo = e => {
  e.stopPropagation();
  //   console.log(e.target);
  //   console.log(e.target.parentElement);

  //napisać funkcję, która będzie szukała z rodzica img i wtedy pociągnie zdjęcie po url bez konieczności fetch'a

  const movie_id = e.target.parentElement.getAttribute('id');
  //   console.log(movie_id);

  getMovieDetails(movie_id).then(el => {
    // console.log(el);
    createModalCard(el);
  });

  modal.parentElement.classList.toggle('visibility');

};

const hideModal = () => {
  modal.parentElement.classList.toggle('visibility');
};

// const btnCloseModal = document.querySelector('.btn--close');
// console.log(btnCloseModal);
//   btnCloseModal.addEventListener('click', hideModal);
// document.body.addEventListener('click',hideModal)

document.addEventListener('DOMContentLoaded', loadMovies());
moviesContainer.addEventListener('click', displayMovieInfo);
