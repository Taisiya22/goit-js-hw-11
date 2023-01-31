import axios from "axios";
import Notiflix from "notiflix";


const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery')




  function getImg(name, page = 1) { 
    const res = axios.get(`https://pixabay.com/api/?key=33166169-8998641aed83cb2aacc3c64c9&
    q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
     return res;
    
}


form.addEventListener('submit', onSearchCountry)
    
function onSearchCountry(e) {
    e.preventDefault();
    let querySearch = form.elements.searchQuery.value.trim();
    getImg(querySearch).then(res => renderMarkup(res.data.hits))
}
 

function renderMarkup(pictures) { 
   const markup = pictures.reduce((acc, { webformatURL, largeImageURL, likes, views, comments, downloads }) => {
        return acc + `
    <div class="photo-card">
  <img src="${webformatURL}" alt="" loading="lazy" width = '200'/>
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

