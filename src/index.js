
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
input.addEventListener('change', handlerInput);



let page = 1;
searchQuery = '';
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
    console.log(res);
    let totalPage = res.data.totalHits;
    if (totalPage === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      clearMarkup();
      return;
    }
    renderMarkup(res.data.hits);
     Notiflix.Notify.success(`Hooray! We found ${totalPage} images.`);
    onSimpleLightBox();
    addVisible();
  
  } catch (error) {
    console.log(error);
  }

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
//       console.log(res);
//    let totalPage = res.data.totalHits ;
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
//      .finally(() => form.reset())
//      clearMarkup();
  
    
// }
 

async function onLoadMoreBtn(e) {
  page += 1;
   let querySearch = form.elements.searchQuery.value.trim();
  try {
   
    const res = await getImg(querySearch, page);
    renderMarkup(res.data.hits);
    // console.log(res);
    onSimpleLightBox();
    addVisible();
    const count = res.data.totalHits / per_page;
    if (page > count) {
      Notiflix.Notify.info('Were sorry, but you ve reached the end of search results.');
      addHidden();
      form.reset();
    }

  }
  catch (error) {
    console.log(error)
  }
  
}


// function onLoadMoreBtn(e) { 

//   page += 1;
//   let querySearch = form.elements.searchQuery.value.trim();
  
//   getImg(querySearch, page)
//     .then(res => {
//       renderMarkup(res.data.hits);
//       // console.log(res);
//       onSimpleLightBox();
//       addVisible();
//       const count = res.data.totalHits / per_page;
//       if (page > count) {
//         Notiflix.Notify.info('Were sorry, but you ve reached the end of search results.');
//         addHidden();
//       }

//     })

// }
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
  console.log(querySearch)
  if (!querySearch) { 
    Notiflix.Notify.failure('Please, fill search field!');
    clearMarkup();
    addHidden()
      return;
  }
  if (querySearch === querySearch) {
    clearMarkup();
   }
 
}
function onSimpleLightBox() {
  new SimpleLightbox('.gallery a', {
        captionDelay: 250,
        captionsData: 'alt',
      }).refresh();
 }
