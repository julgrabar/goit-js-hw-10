import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import debounce from 'lodash/debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs={
    input: document.querySelector('#search-box'),
    countriesList: document.querySelector(".country-list"),
    countriesInfo: document.querySelector(".country-info")
}
refs.input.addEventListener('input', debounce(onInput,DEBOUNCE_DELAY));
function onInput(e){
    clearContainer(refs.countriesInfo);
    clearContainer(refs.countriesList);
    let value= e.target.value.trim();
    if(!value){
        return;
    };
    fetchCountries(value).then(countries=>{
    if(countries.length===1){
        refs.countriesInfo.innerHTML= 
        `<div class="head">
        <img src="${countries[0].flags.svg}" height="20">
        <p>${countries[0].name.common}</p>
        </div>
        <p><b>Capital: </b>${countries[0].capital}</p>
        <p><b>Population: </b>${countries[0].population}</p>
        <p><b>Languages: </b>${Object.values(countries[0].languages)}</p>`;
    }else if(countries.length>10){
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    }else{
    const markup = countries.map((country)=>{
        return `<li class="country-item">
                <img src="${country.flags.svg}" width="30">
                <p>${country.name.common}</p>
                </li>`
        ;})
    .join('');
    document.querySelector(".country-list").innerHTML=markup;}})
    .catch(error=>{
        Notiflix.Notify.failure("Oops, there is no country with that name")});
}

function clearContainer(container){
    container.innerHTML='';
}
