import { movieID } from './fetch';

export const saveToWatched = () => {
  let watched = [];

  const data = JSON.parse(localStorage.getItem('watched'));

  if (data != null) {
    watched = watched.concat(...data);
  }

  const watchedButton = document.querySelector('.btn__addToWatched');

  if (watched.includes(movieID)) {
    const index = watched.indexOf(movieID);
    watched.splice(index, 1);
    watchedButton.textContent = 'ADD TO WATCHED';
  } else {
    watched.push(movieID);

    watchedButton.textContent = 'REMOVE FROM WATCHED';
  }

  localStorage.setItem('watched', JSON.stringify(watched));
};

export const saveToQue = () => {
  let que = [];

  const data = JSON.parse(localStorage.getItem('que'));

  if (data != null) {
    que= que.concat(...data);
  }

  const queButton = document.querySelector('.btn__addToQue');

  if (que.includes(movieID)) {
    const index = que.indexOf(movieID);
    que.splice(index, 1);
    queButton.textContent = 'ADD TO QUE';
  } else {
    que.push(movieID);

    queButton.textContent = 'REMOVE FROM QUE';
  }

  localStorage.setItem('que', JSON.stringify(que));
};
/* var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.type === 'childList') {
      var element = document.getElementsById('btnAddToWatch');
      if (element) {
        // wywołaj funkcję po kliknięciu
        element.addEventListener('click', function () {
          console.log('Element został kliknięty');
        });
        observer.disconnect();
      }
    }
  });
});

var observerConfig = {
  childList: true,
  subtree: true,
};

var targetNode = document.body;
observer.observe(targetNode, observerConfig) */
