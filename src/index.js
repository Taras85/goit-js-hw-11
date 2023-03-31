import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImages } from './js/getPixabay';
import { createCard } from './js/markupPhoto';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix from 'notiflix';
Notiflix.Notify.init({
  width: '30%',
  position: 'center-center',
  fontSize: '16px',
  timeout: 2000,
  backOverlay: true,
  messageMaxLength: 150,
});

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const messageEnd = document.querySelector('.message');


const guard = document.querySelector('.galleryObserver');
const options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};
const imageObserver = new IntersectionObserver(onLoad, options);

function onLoad(entries, observer) {
  messageEnd.classList.add('is-hidden');
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // console.log(entry.isIntersecting);
      page += 1;
      try {
        const response = getImages(searchQuery, page, PAGINATION);
        response.then(photos => {
          const galleryMarkup = photos.data.hits
            .map(img => createCard(img))
            .join('');
          gallery.insertAdjacentHTML('beforeend', galleryMarkup);

          // totalImages = photos.data.hits.length;
          console.log(page * PAGINATION >= photos.data.totalHits);
          console.log(page * PAGINATION);
          if (page * PAGINATION >= photos.data.totalHits) {
            messageEnd.classList.remove('is-hidden');
            Notiflix.Notify.failure;
            ("We're sorry, but you've reached the end of search results. Вибачте, але ви досягли кінця результатів пошуку.");
            observer.unobserve(guard);
          }
        });
      } catch (error) {
        Notiflix.Notify.failure(`${error}`);
        console.log(error);
      }
    }
  });
}

let page = 1;
const PAGINATION = 40;
let searchQuery='';
let lightbox = {};

searchForm.addEventListener('submit', searchFormSubmit);

async function searchFormSubmit(event) {
  messageEnd.classList.add('is-hidden');
  event.preventDefault();

  page = 1;
  searchQuery = searchForm.elements.searchQuery.value.trim();
  if (!searchQuery) {
    return;
  }

  try {
    const response = await getImages(searchQuery, page, PAGINATION);

    if (response.data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again. Вибачте, немає зображень, які відповідають вашому пошуковому запиту. Будь ласка спробуйте ще раз.'
      );
      gallery.innerHTML = '';
      return;
    }

    Notiflix.Notify.success(
      `Hooray! We found ${response.data.totalHits} images. Ура! Ми знайшли ${response.data.totalHits} зображень.`
    );

    const galleryMarkup = response.data.hits
      .map(img => createCard(img))
      .join('');
    messageEnd.classList.add('is-hidden');
    gallery.innerHTML = galleryMarkup;

    // totalImages = response.data.hits.length;

    imageObserver.observe(guard);

    console.log(page * PAGINATION);

    // if (page * PAGINATION >= response.data.totalHits) {
    //   messageEnd.classList.remove('is-hidden');
    //   Notiflix.Notify.failure(
    //     "We're sorry, but you've reached the end of search results. Вибачте, але ви досягли кінця результатів пошуку."
    //   );
    // }
  } catch (error) {
    Notiflix.Notify.failure(`${error}`);
    console.log(error);
  }
  lightbox = new SimpleLightbox('.gallery a');
}
