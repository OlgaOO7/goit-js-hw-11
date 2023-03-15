import { createErrorNotification } from './js/createErrorNotification';
import { showErrorNotFound } from './js/showErrorType' ;
import { ImagesApiService } from './js/api';
import  Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import './css/styles.css';


export const refs = {
  form: document.querySelector('#search-form'),
  galerryContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const imagesApiService = new ImagesApiService();

refs.loadMoreBtn.style.visibility = "hidden";

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onFormSubmit(evt) {
  evt.preventDefault();
  clearGalleryContainer();
  
// imagesApiService.query = evt.currentTarget.elements.searchQuery.value.trim();
  imagesApiService.searchQuery = evt.currentTarget.elements.searchQuery.value.trim();
  
  imagesApiService.resetPage();
  // if(!imagesApiService.query)
  if(!imagesApiService.searchQuery) {
    createErrorNotification();
    Notiflix.Notify.failure('Please, enter your query!');
    return;
  }
  const {data: {totalHits, hits}} = await imagesApiService.getImages();
  if (totalHits === 0) {
    showErrorNotFound();
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return;
  } else {
    createGalleryMarkup(hits);
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    refs.loadMoreBtn.style.visibility = "visible";
    onLightboxCall();
    return;
  }
}

// fetch(`https://pixabay.com/api/?key=34260736-34eeaa34875fe4dc0dfd398f9&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`)

function createGalleryMarkup(hits) {
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

async function onLoadMore () {
  imagesApiService.incrementPage();
  const {data: {totalHits, hits}} = await imagesApiService.getImages();
  const pages = totalHits / imagesApiService.page;
  console.log(pages);
  if (imagesApiService.page * 40 > totalHits) {
    refs.loadMoreBtn.style.visibility = "hidden";
    Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
  }
  createGalleryMarkup(hits);
  onLightboxCall();
}

function clearGalleryContainer() {
  refs.galerryContainer.innerHTML = '';
}

function onLightboxCall() {
  const lightbox = new SimpleLightbox('.gallery a', { 
    // captionsData: 'alt',
    captionDelay: 250,
    spinner: true,
  }).refresh();
}
