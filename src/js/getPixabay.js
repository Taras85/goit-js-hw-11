
import axios from 'axios';


const BASE_URL = 'https://pixabay.com/api/?';
// const SEARCH_ON='';

export function fetchIMG(photo){
axios
  .get(`${BASE_URL}`, {
    params: {
      key: '31705200-2fa5435eb18f6178a2b05a0f8',
      q: SEARCH_ON,
      image_type: 'photo',
      orientation: 'horizontal',
      timeout: 5000,
      safesearch: 'true',
      page: 1,
      per_page: 40,
    },
    headers: {
      'Content-Type': 'application/json',
    },

  })
  .then(response => {

    console.log(response.data);
        const loadHits = response.data.hits.length;
    const totalHits = response.data.totalHits;
    return response.data
  })
  .catch(error => {
    console.log(error.toJSON);
  });
}

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

//***////*** */ */


