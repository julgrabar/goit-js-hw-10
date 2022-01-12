import './css/styles.css';
import fetchCountries from './js/fetchCountries.js';
import debounce from 'lodash/debounce';

const DEBOUNCE_DELAY = 300;

const refs={
    input: document.querySelector('#search-box'),
    countriesList: document.querySelector(".country-list"),
    countriesInfo: document.querySelector(".country-info")
}
refs.input.addEventListener('input', debounce(onInput,DEBOUNCE_DELAY));
function onInput(e){
    refs.countriesInfo.innerHTML="";
    refs.countriesList.innerHTML="";
    let value= e.target.value.trim();
    if(value===""){
        return;
    } ;
    fetchCountries(value)  ;
}