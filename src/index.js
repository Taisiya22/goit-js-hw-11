
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getImg } from "./api";
import { renderMarkup } from "./renderMarkup";

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');
const input = document.getElementById('input');

form.addEventListener('submit', onSearchImg);
loadBtn.addEventListener('click', onLoadMoreBtn);
input.addEventListener('input', handlerInput);

let page = 1;
let querySearch = '';
const per_page = 40;


async function onSearchImg(e) {
   
  e.preventDefault();
  let querySearch = form.elements.searchQuery.value.trim();
   page = 1;
   if (!querySearch) {
     clearMarkup();
     addHidden();
    return;
  } 
  try {
    const res = await getImg(querySearch, page);
    totalPage = res.data.totalHits;
    if (totalPage === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      clearMarkup();
      return;
    }
    Notiflix.Notify.success(`Hooray! We found ${totalPage} images.`);
    renderMarkup(res.data.hits);
    onSimpleLightBox();
    addVisible();}
   catch (error) {
   
  }

  
  finally { () => form.reset() }
     clearMarkup();
    
}


// function onSearchImg(e) {
   
//   e.preventDefault();
//   let querySearch = form.elements.searchQuery.value.trim();
//    page = 1;
//    if (!querySearch) {
//      clearMarkup();
//      addHidden();
//     return;
//    } 
//   getImg(querySearch, page)
//     .then(res => {
//     totalPage = res.data.totalHits ;
//     if (totalPage === 0) {
//       Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//     clearMarkup();
//       return;
//     }
//     renderMarkup(res.data.hits)
//       Notiflix.Notify.success(`Hooray! We found ${totalPage} images.`);
//       onSimpleLightBox();
//       addVisible();
//   })
//      .catch(console.log)
//      .finally(() => form.reset)
//      clearMarkup();
    
// }
 

function onLoadMoreBtn(e) { 

  page += 1;
  let querySearch = form.elements.searchQuery.value.trim();
  
  getImg(querySearch, page)
    .then(res => {
      renderMarkup(res.data.hits);
      console.log(res);
      onSimpleLightBox();
      addVisible();
      const count = res.data.totalHits / per_page;
      if (page > count) {
        Notiflix.Notify.info('Were sorry, but you ve reached the end of search results.');
        addHidden();
      }

    })

}

function clearMarkup() {
  gallery.innerHTML = "";
}
function addHidden() { 
  loadBtn.classList.remove('visible')
  loadBtn.classList.add('hidden')

}
function addVisible() { 
  loadBtn.classList.remove('hidden')
  loadBtn.classList.add('visible')
}

function handlerInput(e) { 
  let querySearch = form.elements.searchQuery.value.trim();
  if (!querySearch) { 
    Notiflix.Notify.failure('Please, fill search field!');
    clearMarkup();
    addHidden()
      return;
  }
}
function onSimpleLightBox() {
  lightbox = new SimpleLightbox('.gallery a', {
        captionDelay: 250,
        captionsData: 'alt',
      }).refresh();
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