import '../src/css/styles.css';
import Notiflix from 'notiflix';

const input = document.querySelector('input')
const form = document.querySelector('.search-form')
const gallery = document.querySelector('.gallery')
const button = document.querySelector('button[type="submit"]')
const buttonMore = document.querySelector('.load-more')

let k = 0
let total = 0

async function fetchSearch(value, k) {
    
  const response = await fetch(`https://pixabay.com/api/?key=27870972-5e8850655f5136701fd41b94f&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=${k}&per_page=40`)
  const result = await response.json()
  return result
  
}

function clearBox()
{
  gallery.innerHTML = "";
}

function createPhoto(result) {
  
  total = total - 40
  
  result.forEach(function callback(photo) {
    
  let listInfo =
  '<div class="photo-card">' +
    '<img src="'+photo.webformatURL+'" height="200" alt="'+photo.tags+'" loading="lazy" />'+
    '<div class="info">'+
      '<p class="info-item">'+
        '<b>Likes '+photo.likes+'</b>'+
      '</p>'+
      '<p class="info-item">'+
        '<b>Views '+photo.views+'</b>'+
      '</p>'+
      '<p class="info-item">'+
        '<b>Comments  '+photo.comments+'</b>'+
      '</p>'+
      '<p class="info-item">'+
        '<b>Downloads '+photo.downloads+'</b>'+
      '</p>'+
    '</div>'+
  '</div>';
  gallery.insertAdjacentHTML('beforeend', listInfo);
  });
  
  if (total <= 0) {

    buttonMore.style.display = "none";
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');      
    
  }
}

form.addEventListener('submit', userInput)
  
function userInput(event) {
  
  event.preventDefault()

  let userInputValue = input.value

  if (userInputValue === '') {
    clearBox()
    k = 0
    return
  } else {
    userInputValue = userInputValue.replace(' ', '+');
    k = k + 1
  }

  fetchSearch(userInputValue, k)
    .then(result => {
      if (result.length === 0) {
        clearBox()
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        
      } else {

        clearBox()
        total = result.totalHits
        createPhoto(result.hits)
  
      } 
    })

    .catch(() => {
      clearBox()
      Notiflix.Notify.failure('Oops, Sorry error');
    })    
  
  }
  

buttonMore.addEventListener('click', userInputMore)
  
function userInputMore(event) {

  event.preventDefault()
  
  buttonMore.style.display = "none";

  let userInputValue = input.value

  if (userInputValue === '') {
    k = 0 
    return
  } else {
    userInputValue = userInputValue.replace(' ', '+');
    k = k + 1
  }

  fetchSearch(userInputValue, k)
    .then(result => {

      if (result.length === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');      
      } else {
        createPhoto(result.hits)
      } 
    })

    .catch(() => {
      clearBox()
      Notiflix.Notify.failure('Oops, Sorry error');
    })    
  
  if (total > 0) {
    buttonMore.style.display = "block";
  }
}

document.querySelector(".load-more", hiddenCloseclick());
button.addEventListener("click", hiddenCloseclick);

function hiddenCloseclick() {
	
  if (buttonMore.style.display == "none"){
    buttonMore.style.display = "block";
  } else {
    buttonMore.style.display = "none"
  }
  
};
