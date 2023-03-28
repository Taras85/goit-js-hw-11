import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImages } from './js/getPixabay';
import { createCard } from './js/markupPhoto';
import throttle from 'lodash.throttle';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
// const messageEl = document.querySelector('.message');
const scrollUpBtn = document.querySelector('.scroll-up-btn');

let searchQuery = '';
let page = 1;
let totalImages;
const PAGINATION = 40;
// let lightbox;

searchForm.addEventListener('submit', searchFormSubmit);
// loadMoreBtn.addEventListener('click', loadMoreBtnClick);
gallery.addEventListener('click', event => {
  event.preventDefault();
});

// document.addEventListener('scroll', throttle(handleScroll, 1000));

async function searchFormSubmit(event) {
  event.preventDefault();

  loadMoreBtn.classList.add('is-hidden');
  page = 1;
  searchQuery = searchForm.elements.searchQuery.value.trim();
  if (!searchQuery) {
    return;
  }

  try {
    const response = await getImages(searchQuery, page, PAGINATION);

    if (response.data.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      gallery.innerHTML = '';
      return;
    }

    Notify.success(`Hooray! We found ${response.data.totalHits} images.`);

    const galleryMarkup = response.data.hits
      .map(img => createCard(img))
      .join('');

    gallery.innerHTML = galleryMarkup;
    loadMoreBtn.classList.remove('is-hidden');
    totalImages = response.data.hits.length;

    if (totalImages >= response.data.totalHits) {
      loadMoreBtn.classList.add('is-hidden');
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    console.log(error);
  }
  lightbox = new SimpleLightbox('.gallery a');
}

// async function loadMoreBtnClick() {
//   loadMoreBtn.setAttribute('disabled', true);

//   page += 1;
//   totalImages += PAGINATION;

//   try {
//     const response = await getImages(searchQuery, page, PAGINATION);

//     const galleryMarkup = response.data.hits
//       .map(img => createPhotoCardMarkup(img))
//       .join('');

//     gallery.insertAdjacentHTML('beforeend', galleryMarkup);
//     loadMoreBtn.disabled = false;

//     if (totalImages >= response.data.totalHits) {
//       console.log(totalImages);
//       console.log(response.data.totalHits);
//       loadMoreBtn.classList.add('is-hidden');
//       Notify.failure(
//         "We're sorry, but you've reached the end of search results."
//       );
//     }
//   } catch (error) {
//     console.log(error);
//   }

//   // lightbox.refresh();
//   // {
//   //   scroll();
//   // }
// }
window.addEventListener('scroll', throttle(scrolLoader, 1000));
async function scrolLoader() {
  console.log(totalImages);

  const documentRect = document.documentElement.getBoundingClientRect();

  if (documentRect.bottom <= document.documentElement.clientHeight + 100) {
    // console.log('full');
    loadMoreBtn.setAttribute('disabled', true);

    page += 1;
    totalImages += PAGINATION;
    // console.log(totalImages / PAGINATION === page);

    try {
      const response = await getImages(searchQuery, page, PAGINATION);
      console.log(response.data.hits.length);
      const galleryMarkup = response.data.hits

        .map(img => createCard(img))
        .join('');

      gallery.insertAdjacentHTML('beforeend', galleryMarkup);
      loadMoreBtn.disabled = false;

      if (totalImages >= response.data.totalHits) {
        // console.log(totalImages);
        // console.log(response.data.totalHits);
        loadMoreBtn.classList.add('is-hidden');
        Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }
    } catch (error) {
      console.log(error);
    }
    // loadMoreBtnClick();
  }
}
