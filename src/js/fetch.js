import axios from 'axios';
import { renderMovies } from './search-form';
//import { loadMovies } from './cards-home';
import { renderCardPaginator } from './pagination';
import { refreshRendering } from './refreshrendering';

const API_KEY = '7e626872ba2c457d969115031d94d6fb';
const BASE_URL = 'https://api.themoviedb.org/3/';

export let page = 1;
export let movieID

//fetch for getting movies based on input for searching
export const getSearchedMovies = async (searchInput, page = 1) => {
  const urlForSearching = ''.concat(
    BASE_URL,
    'search/movie?api_key=',
    API_KEY,
    '&query=',
    searchInput,
    `&page=${page}`
  );

  const response = await axios
    .get(urlForSearching)
    .then(function (response) {
      // handle success
      refreshRendering();
      renderCardPaginator(response.data.total_pages, response.data.page);
      renderMovies(response);
      //   console.log(response);
      return response;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      // Notiflix.Notify.error(
      //   'We are sorry, but getting data is impossible in that moment'
      // );
    });
  console.log('Input Response', response);
  return response;
};

//fetch for getting movies for initial website based on daily trending
export const getInitialMovies = async () => {
  const urlForInitialMovies = ''.concat(
    BASE_URL,
    'trending/movie/day?api_key=',
    API_KEY,
    `&page=${page}`
  );

  const response = await axios
    .get(urlForInitialMovies)
    .then(function (response) {
      // handle success

      return response;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      // Notiflix.Notify.error(
      //   'We are sorry, but getting data is impossible in that moment'
      // );
    });

  return response;
};

// get movies genres
export const getGenres = async () => {
  const urlForGenres = ''.concat(
    BASE_URL,
    'genre/movie/list?api_key=',
    API_KEY
  );

  const response = await axios
    .get(urlForGenres)
    .then(function (response) {
      // handle success
      //   console.log(response);
      return response.data.genres;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });

  return response;
};

// API configuration: check for images
// const getConfiguration = async () => {
//   const urlForInitialMovies = ''.concat(
//     BASE_URL,
//     'configuration?api_key=',
//     API_KEY
//   );

//   const response = await axios
//     .get(urlForInitialMovies)
//     .then(function (response) {
//       // handle success
//       console.log(response);
//     })
//     .catch(function (error) {
//       // handle error
//       console.log(error);
//     });

//   return response;
// };

// getConfiguration()

//get movie details
export const getMovieDetails = async movie_id => {
  const urlForMovieDetails = ''.concat(
    BASE_URL,
    `movie/${movie_id}?api_key=`,
    API_KEY
  );

  const response = await axios
    .get(urlForMovieDetails)
    .then(function (response) {
      // handle success
      console.log(response.data);
      movieID = response.data.id
      return response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });

  return response;
};

//   getMovieDetails()
