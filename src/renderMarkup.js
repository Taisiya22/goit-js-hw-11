
const gallery = document.querySelector('.gallery');
export function renderMarkup(pictures) {
  markup = pictures.reduce((acc, { webformatURL, tags, largeImageURL, likes, views, comments, downloads }) => {
    return acc + `
      <a class="gallery__link" href="${largeImageURL}">
   <div class="gallery-item">
    <img  src="${webformatURL}" alt="${tags}" loading="lazy" width = "200"/>
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
</div></a>`}, '')

    return gallery.insertAdjacentHTML('beforeend', markup)
}
