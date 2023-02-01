
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getImg } from "./api";


const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

form.addEventListener('submit', onSearchImg);
loadBtn.addEventListener('click', onLoadMoreBtn);

let page = 1;
let querySearch = '';
const per_page = 40;



 function onSearchImg(e) {
  e.preventDefault();
  let querySearch = form.elements.searchQuery.value.trim();
   page = 1;
   if (!querySearch) {
    Notiflix.Notify.warning('Entry image name!');
     clearMarkup();
     loadBtn.hidden = true;
    return;
   } 
  
  getImg(querySearch, page)
  .then(res => {
    if (res.data.totalHits === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    clearMarkup();
      return;
    }
    renderMarkup(res.data.hits)
    lightbox = new SimpleLightbox('.gallery a', {
      captionDelay: 250,
      captionsData: 'alt',
       
    }).refresh();
    
    loadBtn.hidden = false;
  })
     .catch(console.log)
     .finally(() => form.reset)
   clearMarkup();
    
}

function onLoadMoreBtn(e) { 
  page += 1;
   let querySearch = form.elements.searchQuery.value.trim();
  getImg(querySearch, page)
    .then(res => {
      renderMarkup(res.data.hits)
      lightbox = new SimpleLightbox('.gallery a', {
        captionDelay: 250,
        captionsData: 'alt',
      }).refresh();
      loadBtn.hidden = false;
      if (page === per_page) {
        loadBtn.hidden = true;
      }
    })

}

function renderMarkup(pictures) {
  markup = pictures.reduce((acc, { webformatURL, tags, largeImageURL, likes, views, comments, downloads }) => {
    return acc + `
   <div class="photo-card">
    <a class="image-link" href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" width = "200"/></a>
    <div class="info">
        <p class="info-item">
            <b>Likes</b><span>${likes}</span>
        </p>
        <p class="info-item"><span>${views}</span>
            <b>Views</b>
        </p>
        <p class="info-item"><span>${comments}</span>
            <b>Comments</b>
        </p>
        <p class="info-item"><span>${downloads}</span>
            <b>Downloads</b>
        </p>
       
    </div>
</div>`}, '')

    return gallery.insertAdjacentHTML('beforeend', markup)
}


function clearMarkup() {
  gallery.innerHTML = "";
}


// async function onSearchCountry(e) { 
//   let inputValue = e.target.value.trim();
//   if (!inputValue) {
//     Notiflix.Notify.warning('Entry name country!');
//     clearMarkup();
//     return;
//    } 
  
//   try {
//     const countries = await fetchCountries(inputValue);
//     renderCountryList(countries);
//   } catch (error) {
//     onError();
//   }