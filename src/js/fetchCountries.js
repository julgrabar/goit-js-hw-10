import debounce from 'lodash/debounce';
import Notiflix from 'notiflix';
const refs={
    input: document.querySelector('#search-box'),
    countriesList: document.querySelector(".country-list"),
    countriesInfo: document.querySelector(".country-info")
}
refs.input.addEventListener('input', debounce(onInput,300));
function onInput(e){
    refs.countriesInfo.innerHTML="";
    refs.countriesList.innerHTML="";
    let value= e.target.value.trim();
    if(value===""){
        return;
    }
    fetch(`https://restcountries.com/v3.1/name/${value}?fields=name,capital,population,flags,languages`)
    .then(responce=>{return responce.json()})
    .then(countries=>{
        if(countries.length===1){
            return refs.countriesInfo.innerHTML=`<div class="head">
            <img src="${countries[0].flags.svg}" height="20">
            <p>${countries[0].name.common}</p>
            </div>
            <p><b>Capital: </b>${countries[0].capital}</p>
            <p><b>Population: </b>${countries[0].population}</p>
            <p><b>Languages: </b>${Object.values(countries[0].languages)}</p>`
        }else if(countries.length>10){
            return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        }
        const markup = countries.map((country)=>{
            return `<li class="country-item">
            <img src="${country.flags.svg}" width="30">
            <p>${country.name.common}</p>
            </li>`
        })
        .join('');
        refs.countriesList.innerHTML=markup;
    }
    )
    .catch(error=>{
        Notiflix.Notify.failure("Oops, there is no country with that name")
    });
    
}