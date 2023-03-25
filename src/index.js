// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import axios from 'axios';

// axios({
//   method: 'post',
//   url: '/user/12345',
//   data: {
//     firstName: 'Fred',
//     lastName: 'Flintstone',
//   },
// });

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

// searchForm.addEventListener('submit', fetchIMG);
// loadBtn.addEventListener('click', onLoadMore);

const BASE_URL = 'https://pixabay.com/api/?';

axios
  .get(`${BASE_URL}`, {
    params: {
      key: '31705200-2fa5435eb18f6178a2b05a0f8',
      q: 'redbul',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    },
    headers: {
      'Content-Type': 'application/json',
      //   key: '31705200-2fa5435eb18f6178a2b05a0f8',
    },
  })
  .then(response => {
    console.log(response);
    console.log(response.data);
    console.log(response.data.hits);
  })
  .catch(error => {
    console.log(error);
  });

// function fetchIMG(photo) {
//   fetch(
//     `https://pixabay.com/api/?key=31705200-2fa5435eb18f6178a2b05a0f8&q=yellow+flowers&image_type=photo`
//   )
//     .then(response => {
//       if (!response.ok) {
//         throw Error(response.status);
//       }
//     })
//     .then(imeges => {
//       console.log(imeges);
//     });
// }
