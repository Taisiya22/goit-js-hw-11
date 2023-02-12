
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getImg } from "./api";
import { renderMarkup } from "./renderMarkup";
import throttle from "lodash.throttle";

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');


form.addEventListener('submit', onSearchImg);
loadBtn.addEventListener('click', onLoadMoreBtn);




let page = 1;
let querySearch = '';
const per_page = 40;


async function onSearchImg(e) {
   
  e.preventDefault();
  querySearch = form.elements.searchQuery.value.trim();
  page = 1;
  clearMarkup();
 
  if (!querySearch) {
    Notiflix.Notify.failure('Please, fill search field');
    clearMarkup();
    addHidden();
    return;
  }
  
  try {
    const res = await getImg(querySearch, page);
    // console.log(res);
   let totalPage = res.data.totalHits;
    if (totalPage === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      clearMarkup();
      return;
    }
     
    renderMarkup(res.data.hits);
    observer.observe(target);
    Notiflix.Notify.success(`Hooray! We found ${totalPage} images.`);
    onSimpleLightBox();
    addVisible();
  } catch (error) {
    console.log(error);
  }

}


 

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

function onSimpleLightBox() {
  new SimpleLightbox('.gallery a', {
        captionDelay: 250,
        captionsData: 'alt',
      }).refresh();
}
 


// безкінечний скрол

// window.addEventListener('scroll', throttle(onInfititeScroll, 500))

// async function onInfititeScroll ()
// {
//   const docHeight = document.documentElement.getBoundingClientRect();
//   const viewHeight = document.documentElement.clientHeight;
//   if (docHeight.bottom < viewHeight + 150) {
//     page += 1;
//     let querySearch = form.elements.searchQuery.value.trim();
//     const res = await getImg(querySearch,page);
//     renderMarkup(res.data.hits);
//     const count = res.data.totalHits - per_page * page;
//     if (count < 0) {
//     Notiflix.Notify.info('Were sorry, but you ve reached the end of search results.')
//     window.removeEventListener('scroll', throttle(onInfititeScroll, 500))
      
//      return;

// }
//   }

//   }

// безкінечний скрол практика Рисіч

let options = {
  root: null,
  rootMargin: "300px",
  threshold: 0,
};
export let callback = (entries, observer) => {
  entries.forEach((entry) => {
    console.log(entry)
    if (entry.isIntersecting) {
      page += 1;
       let querySearch = form.elements.searchQuery.value.trim();
      getImg(querySearch, page).then((res) => {
        renderMarkup(res.data.hits);
        onSimpleLightBox();
       const count = res.data.totalHits - per_page * page;
    if (count < 0) {
    Notiflix.Notify.info('Were sorry, but you ve reached the end of search results.')
          observer.unobserve(target);
          addHidden();
          return;
        }
      });
    }
  });
};
let observer = new IntersectionObserver(callback, options);
let target = document.querySelector(".js-guard");