//import '../../css/index.min.css';
import '../css/index.min.css';

const headerHome = document.querySelector('.header-home');
const home = document.querySelector('#home');
const library = document.querySelector('#library');
const form = document.querySelector('.search-form');
const menu = document.querySelector('.menu');
const headerHomeContainer = document.querySelector('.header-home__container');

library.addEventListener('click', () => {
//const bgrImage = '/src/images/bg-image.jpg';
  headerHome.style.backgroundImage = `url(src/images/Rectangle-1x-desktop.jpg)`;
  form.classList.add('visually-hidden');
  const btnContainer = document.createElement('div');
  btnContainer.innerHTML = '';
  headerHomeContainer.append(btnContainer);
  btnContainer.innerHTML = ` <div class="switch__btn">
  <div class="switch__btn__icon-container">
    <i class="switch__btn__icon fa-solid fa-sun"></i>
  </div>
</div>

<ul class="header__btn-wrapper btn-wrapper js-library-controls">
  <li>
    <button
      class="header__btn btn btn--white btn-js-active js-btn-watched"
      type="button"
    >
      Watched
    </button>
  </li>
  <li>
    <button class="header__btn btn btn--white js-btn-qeue" type="button">
      Queue
    </button>
  </li>
</ul>`
});

home.addEventListener('click', () => {
    const bgrImage = '/src/images/bg-image.jpg';
    headerHome.style.backgroundImage = `url(/src/images/bg-image.jpg)`;
btnContainer.innerHTML = '';
    form.classList.remove('visually-hidden');
});

