import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImages } from './js/getPixabay';
import { createCard } from './js/markupPhoto';
// import throttle from 'lodash.throttle';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.load-more');
// const messageEl = document.querySelector('.message');
// const scrollUpBtn = document.querySelector('.scroll-up-btn');
// const response={};

const guard = document.querySelector('.galleryO');
const options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};
const imageObserver = new IntersectionObserver(onLoad, options);

function onLoad(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;
      try {
        const response = getImages(searchQuery, page, PAGINATION);
        response.then(photos => {
          console.log(photos.data)
        const galleryMarkup = photos.data.hits
      .map(img => createCard(img))
            .join('');
         gallery.insertAdjacentHTML('beforeend', galleryMarkup);
    // loadMoreBtn.classList.remove('is-hidden');

          totalImages = photos.data.hits.length;
          console.log(totalImages)
        })
      }
        

      // if (Number(page * PAGINATION) >= data.totalHits) {
      //   observer.unobserve(guard);
      // }

      // const galleryMarkup = response.data.hits
      //   .map(img => createCard(img))
      //   .join('');
      // gallery.innerHTML = galleryMarkup;
      // totalImages = response.data.hits.length;
    }
  });
}

// let searchQuery = '';
let page = 1;
let totalImages;

const PAGINATION = 40;
// let lightbox;

searchForm.addEventListener('submit', searchFormSubmit);
// loadMoreBtn.addEventListener('click', loadMoreBtnClick);
// gallery.addEventListener('click', event => {
//   event.preventDefault();
// });

async function searchFormSubmit(event) {
  event.preventDefault();

  // loadMoreBtn.classList.add('is-hidden');
  page = 1;
  searchQuery = searchForm.elements.searchQuery.value.trim();
  if (!searchQuery) {
    return;
  }

  try {
    const response = await getImages(searchQuery, page, PAGINATION);

    if (responsea.data.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      // gallery.innerHTML = '';
      return;
    }

    Notify.success(`Hooray! We found ${response.data.totalHits} images.`);

    const galleryMarkup = response.data.hits
      .map(img => createCard(img))
      .join('');

    gallery.innerHTML = galleryMarkup;
    // loadMoreBtn.classList.remove('is-hidden');

    totalImages = response.data.hits.length;
    imageObserver.observe(guard);

    if (totalImages >= response.data.totalHits) {
      // loadMoreBtn.classList.add('is-hidden');
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    console.log(error);
  }
  lightbox = new SimpleLightbox('.gallery a');
}

// window.addEventListener('scroll', throttle(loadMoreBtnClick, 1000));

// async function loadMoreBtnClick(event) {
//   event.preventDefault();
//   const documentRect = document.documentElement.getBoundingClientRect();

//   if (documentRect.bottom <= document.documentElement.clientHeight + 100) {
//     // loadMoreBtn.classList.add('is-hidden');
//     page += 1;
//     // searchQuery = searchForm.elements.searchQuery.value.trim();
//     // if (!searchQuery) {
//     //   return;
//     // }

//     try {
//       const response = await getImages(searchQuery, page, PAGINATION);

//       if (response.data.hits.length === 0) {
//         Notify.failure(
//           'Sorry, there are no images matching your search query. Please try again.'
//         );
//         gallery.innerHTML = '';
//         return;
//       }

//       Notify.success(`Hooray! We found ${response.data.totalHits} images.`);

//       const galleryMarkup = response.data.hits
//         .map(img => createCard(img))
//         .join('');

//       gallery.innerHTML = galleryMarkup;
//       loadMoreBtn.classList.remove('is-hidden');
//       totalImages = response.data.hits.length;

//       if (totalImages >= response.data.totalHits) {
//         loadMoreBtn.classList.add('is-hidden');
//         Notify.failure(
//           "We're sorry, but you've reached the end of search results."
//         );
//       }
//     } catch (error) {
//       console.log(error);
//     }
//     lightbox = new SimpleLightbox('.gallery a');
//   }
// }
