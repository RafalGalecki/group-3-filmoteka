import { getSearchedMovies } from './fetch';
import { refreshRendering } from './refreshrendering';

const form = document.querySelector('#search-form');
const handleSubmit = e => {
  e.preventDefault();
  const searchInput = e.target[0].value;
  console.log("keywords are ", searchInput);
  refreshRendering();
  getSearchedMovies(searchInput);
};

form.addEventListener('submit', handleSubmit);


