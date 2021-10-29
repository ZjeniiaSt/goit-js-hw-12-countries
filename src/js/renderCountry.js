import API from './api-service';
import getRefs from './getRefs';
import countryMarkup from '../templates/counrty_markup.hbs';
import listMarkup from '../templates/list_markup.hbs';

const refs = getRefs();

refs.searchForm.addEventListener('input', onSearh);

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
  }
}

function onFetchError(error) {
  alert('Oops, we have a problem');
}

function clearContainer() {
  refs.cardContainer.innerHTML = '';
}
