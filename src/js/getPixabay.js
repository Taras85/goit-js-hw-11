import axios from 'axios';

export function getImages(searchQuery, page, PAGINATION) {
  const API_KEY = '31705200-2fa5435eb18f6178a2b05a0f8';
  const BASE_URL = 'https://pixabay.com/api/';
  //   const URL = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${PAGINATION}`;

  //  console.log(`${BASE_URL}`)

  return axios.get(`${BASE_URL}`, {
    params: {
      key: '31705200-2fa5435eb18f6178a2b05a0f8',
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      timeout: 2000,
      safesearch: 'true',
      page: page,
      per_page: PAGINATION,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// function addObserve() {
//   const lastCard = document.querySelector('.photo-card:last-child');

//   if (lastCard) {
//     infiniteObserver.observe(lastCard);
//   }
// }VSHDeveloper
