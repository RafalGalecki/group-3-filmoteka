import { moviesContainer } from './cards-home';
import { getGenres, getMovieDetails } from './fetch';

const modal = document.querySelector('.modal-card');

export const createModalCard = el => {
  const btnClose = document.createElement('button');
  btnClose.classList.add('btn--close');
  btnClose.setAttribute('id', 'close-modal');
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
    modalMovieInfoList,
    modalMovieAbout,
    modalMovieDesc,
    modalBtnAddWatch,
    modalBtnAddQue
  );
};

const displayMovieInfo = async e => {
  const movie_id = e.target.parentElement.getAttribute('id');

  getMovieDetails(movie_id).then(el => {
    createModalCard(el);
    modal.parentElement.classList.toggle('visibility');
  });
};

function hideModal() {
  modal.parentElement.classList.toggle('visibility');
  modal.replaceChildren();
  modal.removeEventListener('click', hideModal);
}

moviesContainer.addEventListener('click', displayMovieInfo);

modal.addEventListener('click', el => {
  btnCloseModal = document.getElementsByClassName('btn--close')[0];
  if (el.target === btnCloseModal) {
    hideModal();
  }
});
