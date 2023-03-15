import { refs } from '../index';

export function createGalleryMarkup(hits) {
  const markup = hits.map(hit => {
    return `
    <div class="photo-card">
      <a class="gallery__item" href="${hit.largeImageURL}"> 
        <img class="photo" src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">
        <b>Likes</b>: ${hit.likes}
        </p>
        <p class="info-item">
        <b>Views</b>: ${hit.views}
        </p>
        <p class="info-item">
        <b>Comments</b>: ${hit.comments}
        </p>
        <p class="info-item">
        <b>Downloads</b>: ${hit.downloads}
        </p>
      </div>
    </div>`
  }).join("");
  refs.galerryContainer.insertAdjacentHTML('beforeend', markup);
};