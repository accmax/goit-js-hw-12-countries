import './sass/main.scss';

import fetchCountries from './js/fetchCountries';
import countrySearchList from './templates/countries-search-list.hbs';
import countryMarkup from './templates/country.hbs';

import debounce from 'lodash.debounce';
import showError from './js/errors';

const INPUT_DELAY = 1000;

const countrySearchEL = document.querySelector('[name="countrySearch"]');
const countriesContainerEl = document.querySelector('.countries-container');

countrySearchEL.addEventListener('input', debounce(onCountryNameInput, INPUT_DELAY));

function onCountryNameInput() {
    if (countrySearchEL.value === '') {
        resetMarkup();
        return;
    };

    fetchCountries(countrySearchEL.value).then(countriesData => {
        if (countriesData.length > 10) {
            throw new Error("Too many matches found. Enter a more specific query!")
        } else if (countriesData.length === 1) {
            renderCountryInfoMarkup(countriesData);
        } else {
            renderCountryList(countriesData);
        };
    })
        .catch(catchedError => {
            showError(catchedError);
        });
};

function resetMarkup() {
    countriesContainerEl.innerHTML = '';
};

function renderCountryInfoMarkup(countriesData) {
    countriesContainerEl.innerHTML = countryMarkup(countriesData);
};

function renderCountryList(countriesData) {
    countriesContainerEl.innerHTML = countrySearchList(countriesData);
};