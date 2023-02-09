import { getSearchedMovies } from './fetch';

const form = document.querySelector('#search-form');

const handleSubmit = e => {
  e.preventDefault();
  const searchInput = e.target[0].value;
  console.log(searchInput);
  getSearchedMovies(searchInput);
};

form.addEventListener('submit', handleSubmit);