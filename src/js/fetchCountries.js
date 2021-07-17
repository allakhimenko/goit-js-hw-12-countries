const BASE_URL = 'https://restcountries.eu/rest/v2'

function fetchCountries(searchQuery) {
     
    return fetch(`${BASE_URL}/name/${searchQuery}`)
    .then(response => response.json())
    .catch(console.error)
}

export default {fetchCountries}