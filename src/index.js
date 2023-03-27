// // // Описаний в документації
// import SimpleLightbox from 'simplelightbox';
// // // Додатковий імпорт стилів
// import 'simplelightbox/dist/simple-lightbox.min.css';

// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// // import axios from 'axios';


// import { getPixabay } from './js/getPixabay';

// const searchForm = document.querySelector('.search-form');
// const searchInput = searchForm.querySelector('[name=searchQuery]')
// console.log (searchInput)
// const gallery = document.querySelector('.gallery');
// const loadBtn = document.querySelector('.load-more');



// searchForm.addEventListener('submit', fetchIMG);
// // loadBtn.addEventListener('click', onLoadMore);


// function fetchIMG(event){
//   const SEARCH_ON = searchInput.value
//   event.preventDefault();
//   // console.log(searchData)

// }


//***///*** */ */



import Notiflix from 'notiflix';
// import { fetchImages } from './fetchImages';
import axios from 'axios';
import { markup } from './js/markupPhoto';
import { getPixabay } from './js/getPixabay';


  const searchForm = document.querySelector('.search-form');
  const inputEl = document.querySelector('input');
  const submitBtn = document.querySelector('button');
  const galleryEl = document.querySelector('.gallery');
  const loadBtn = document.querySelector('.load-more');


  searchForm.addEventListener('submit', onFormSubmit);
  loadBtn.addEventListener('click', onLoadMore);

const BASE_URL = 'https://pixabay.com/api';
const KEY = '31705200-2fa5435eb18f6178a2b05a0f8';

const params = {
  page: 1,
  perPage: 40,
  q: '',
};

loadBtn.classList.add('is-hidden');

function onFormSubmit(event) {
  event.preventDefault();
  params.page = 1;
  params.q = inputEl.value;
  galleryEl.innerHTML = '';
  loadBtn.classList.add('is-hidden');
  fetchImages();
  // SEARCH_ON = inputEl.value;
  // fetchIMG()

}

async function fetchImages() {
  const parameters = new URLSearchParams({
    ...params,
    image_type: 'photo',
    orientation: 'horizontal',
    pretty: true,
    key: KEY,
  });

  try {
    const response = await axios.get(`${BASE_URL}/?${parameters}`);
    const loadHits = response.data.hits.length;
    const totalHits = response.data.totalHits;

    if (loadHits === 0) {
      loadBtn.classList.add('is-hidden');
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    if (params.page === 1) {
      Notiflix.Notify.success(`We have found ${totalHits} images.`);
    }

    galleryMarkup(response.data.hits);
    loadBtn.classList.remove('is-hidden');

    if (params.page * params.perPage >= totalHits) {
      loadBtn.classList.add('is-hidden');
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } 
  catch (error) {
    console.log(error);
  }
}

function onLoadMore() {
  params.page += 1;
  fetchImages();
}

function galleryMarkup(photos) {
  galleryEl.insertAdjacentHTML('beforeend', markup(photos));
}