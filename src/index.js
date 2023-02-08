import './css/styles.css';
import Notiflix from 'notiflix';
import Axios from 'axios';
import SimpleLightbox from "simplelightbox";
import NewsApi from './fetchphoto';
import LoadmoreBtn from './components/LoadMoreBtn.js';

const form = document.querySelector('.search-form');
const loadMoreBtn = new LoadmoreBtn('.load-more');




const newsApi = new NewsApi();

loadMoreBtn.button.addEventListener('click', onLoadMore)
form.addEventListener('submit', onSubmit);



 async function onSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  newsApi.searchQuery = form.elements.searchQuery.value.trim();
  console.log(newsApi.searchQuery);

  clearPage();
  newsApi.resetPage();
   loadMoreBtn.show();
   
  loadMoreBtn.disable();
  
   try {
     const {hits} = await newsApi.fetchPhoto(newsApi.searchQuery);
     if (hits.length === 0) throw new Error('No data');
     const markup = hits.reduce((markup, hit) => createMarkUp(hit) + markup, '');
     
     updatePage(markup);
     loadMoreBtn.enable();
   } catch (err) {
     onError()
   }
   finally { form.reset() };

};
  
  
async function onLoadMore() {
 loadMoreBtn.disable();
  
   
     const {hits} = await newsApi.fetchPhoto(newsApi.searchQuery);
     if (hits.length === 0) throw new Error('No data');
     const markup = hits.reduce((markup, hit) => createMarkUp(hit) + markup, '');
     
     updatePage(markup);
     loadMoreBtn.enable();
};


function createMarkUp({ webformatURL, likes, views, comments, downloads }) {
  return `<div class="photo-card">
  <img src="${webformatURL}" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
    ${views}</p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>`
};



function updatePage(markup) {
  document.querySelector('.gallery').insertAdjacentHTML('beforeend', markup)
} 
function clearPage() {
  document.querySelector('.gallery').innerHTML = '';
} 
function onError(err) {
  console.error(err)
  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
}