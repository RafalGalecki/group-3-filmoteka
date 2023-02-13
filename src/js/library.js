import '../css/index.min.css';

const headerHome = document.querySelector('.header-home');
const libraryLink = document.querySelector('#library');
const body = document.body;



const libraryTemp = document.querySelector('.library-temp');
const temp = libraryTemp.content.cloneNode(true);
const homeLink = temp.querySelector('#home');
console.log(temp);


libraryLink.addEventListener('click', () => {
    headerHome.classList.add('visually-hidden');
    body.prepend(temp);
});

homeLink.addEventListener('click', () => {
    const headerLibrary = document.querySelector('.header-library');
    headerHome.classList.remove('visually-hidden');
    headerLibrary.remove();
    
} )



