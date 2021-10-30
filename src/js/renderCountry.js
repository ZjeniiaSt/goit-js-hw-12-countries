import API from './api-service';
import getRefs from './getRefs';
import countryMarkup from '../templates/counrty_markup.hbs';
import listMarkup from '../templates/list_markup.hbs';
import debounce from 'lodash.debounce';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, Stack } from '@pnotify/core';

const myStack = new Stack({
  dir1: 'up',
});

alert({
  text: "I'm a notice centered at the bottom!",
  stack: myStack,
});

const refs = getRefs();

refs.searchForm.addEventListener('input', debounce(onSearh, 500));

function onSearh(e) {
  e.preventDefault();
  const searchQuery = refs.searchForm.value;
  clearContainer();
  API.fethCountry(searchQuery).then(renderCountry).catch(onFetchError);
}

function renderCountry(country) {
  let countryList = country.length;

  if (countryList === 1) {
    refs.cardContainer.innerHTML = countryMarkup(country);
  } else if (countryList <= 10) {
    refs.cardContainer.innerHTML = listMarkup(country);
  } else if (countryList > 10) {
    console.log('дописати');
    const myStack = new Stack({
      dir1: 'down',
    });
    alert({
      text: 'Give me more letters and I will find the country',
      stack: myStack,
    });
  }
}

function onFetchError(error) {
  alert('Oops, we have a problem');
}

function clearContainer() {
  refs.cardContainer.innerHTML = '';
}
