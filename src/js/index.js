import '../sass/main.scss';
import API from './fetchCountries';
import countryCard from '../template/country-card.hbs';
import countryList from '../template/country-list.hbs';
var debounce = require('lodash.debounce');
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { info, success, error } from '@pnotify/core';
import { defaults } from '@pnotify/core';
defaults.delay = 1500;
defaults.remove = true;

const card = document.querySelector('.country');
const search = document.querySelector('.search');

search.addEventListener('input', debounce(onSearchInput, 500));

function renderList(items) {
    const markup = countryList(items);
    card.insertAdjacentHTML('beforeend', markup);
}

function renderCard(item) {
    const markup = countryCard(item);
    card.insertAdjacentHTML('beforeend', markup);
}
 
function onSearchInput(event) {
    if (!event.target.value) return;
  
    event.preventDefault();
    const searchQuery = event.target.value.trim()

    API.fetchCountries(searchQuery)
    .then(searchSuccess)
    .catch(error => console.log(error))
    .finally(clearMarkup());
}

function searchSuccess(request) {
 

    if (request.length === 1) {
        renderCard(request);

        success({
            text: "Your request is succesful!"});
        return;
      }

    if (request.length >= 2 && request.length <= 10) {
        renderList(request);

        info({
            text: "Specify your request"})
        return;
      }

      if (!request.textContent) {
        error({
            text: "Enter the correct request"})
      return;
      }

      if (request.status === 404) {
        error({
            text: "Enter the correct request"})
      return;
        }
}

function clearMarkup() {
    card.innerHTML = '';
  };
