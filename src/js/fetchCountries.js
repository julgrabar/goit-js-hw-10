export default function fetchCountries(value){
    return fetch(`https://restcountries.com/v3.1/name/${value}?fields=name,capital,population,flags,languages`)
    .then((responce,error)=>{
        return responce.json()})
    .catch(error=>{
        return error;
    });
}