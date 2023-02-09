import axios from 'axios';

const API_KEY = '7e626872ba2c457d969115031d94d6fb';
const BASE_URL = 'https://api.themoviedb.org/3/';

//fetch for getting movies based on input for searching
export const getSearchedMovies = async searchInput => {
  const urlForSearching = ''.concat(
    BASE_URL,
    'search/movie?api_key=',
    API_KEY,
    '&query=',
    searchInput
  );

  const response = await axios
    .get(urlForSearching)
    .then(function (response) {
      // handle success

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

  return response;
};

//fetch for getting movies for initial website based on weekly trending
export const getInitialMovies = async () => {
  const urlForInitialMovies = ''.concat(
    BASE_URL,
    'trending/movie/week?api_key=',
    API_KEY
  );

  const response = await axios
    .get(urlForInitialMovies)
    .then(function (response) {
      // handle success

      // console.log(response);
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
    return response.data.genres
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
