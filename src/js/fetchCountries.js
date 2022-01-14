export default function fetchCountries(value){
    return fetch(`https://restcountries.com/v3.1/name/${value}?fields=name,capital,population,flags,languages`)
    .then(responce=>{
        if (responce.ok) return responce.json();
        throw new Error('Error fetching data');
    })
    .catch(error=>{
        console.log('Error: ', error);
    });
}