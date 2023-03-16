import { createErrorNotification, showErrorNotFound } from './js/error';
import { ImagesApiService } from './js/api';
import { createGalleryMarkup } from './js/markup';
import  Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import './css/styles.css';


export const refs = {
  form: document.querySelector('#search-form'),
  galerryContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  // btnScroll: document.querySelector('.btn-scroll'),
};

const imagesApiService = new ImagesApiService();

refs.loadMoreBtn.style.visibility = "hidden";
// refs.btnScroll.style.visibility = "hidden";

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
// refs.btnScroll.addEventListener('click', onBtnScroll);

async function onFormSubmit(evt) {
  evt.preventDefault();
  clearGalleryContainer();
  refs.loadMoreBtn.style.visibility = "hidden";
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
    // refs.btnScroll.style.visibility = "visible";
    lightbox.refresh();
    return;
  }
}

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
  // onBtnScroll();
  lightbox.refresh();
}

function clearGalleryContainer() {
  refs.galerryContainer.innerHTML = '';
}

  const lightbox = new SimpleLightbox('.gallery a', { 
    // captionsData: 'alt',
    captionDelay: 250,
    spinner: true,
  });


// function onBtnScroll(){
//   const { height: cardHeight } = document
//     .querySelector("refs.galerryContainer")
//     .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });
// }
