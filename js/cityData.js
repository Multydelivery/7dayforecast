// Array of city data with coordinates
const cityData = [
    { lat: 52.367, lon: 4.904, city: "Amsterdam", country: "Netherlands" },
    { lat: 39.933, lon: 32.859, city: "Ankara", country: "Turkey" },
    { lat: 56.134, lon: 12.945, city: "Åstorp", country: "Sweden" },
    { lat: 37.983, lon: 23.727, city: "Athens", country: "Greece" },
    { lat: 54.597, lon: -5.930, city: "Belfast", country: "Northern Ireland" },
    { lat: 41.387, lon: 2.168, city: "Barcelona", country: "Spain" },
    { lat: 52.520, lon: 13.405, city: "Berlin", country: "Germany" },
    { lat: 46.948, lon: 7.447, city: "Bern", country: "Switzerland" },
    { lat: 43.263, lon: -2.935, city: "Bilbao", country: "Spain" },
    { lat: 50.847, lon: 4.357, city: "Brussels", country: "Belgium" },
    { lat: 47.497, lon: 19.040, city: "Bucharest", country: "Romania" },
    { lat: 59.329, lon: 18.068, city: "Budapest", country: "Hungary" },
    { lat: 51.483, lon: -3.168, city: "Cardiff", country: "Wales" },
    { lat: 50.937, lon: 6.96, city: "Cologne", country: "Germany" },
    { lat: 55.676, lon: 12.568, city: "Copenhagen", country: "Denmark" },
    { lat: 51.898, lon: -8.475, city: "Cork", country: "Ireland" },
    { lat: 53.349, lon: -6.260, city: "Dublin", country: "Ireland" },
    { lat: 55.953, lon: -3.188, city: "Edinburgh", country: "Scotland" },
    { lat: 43.7696, lon: 11.255, city: "Florence", country: "Italy" },
    { lat: 50.110, lon: 8.682, city: "Frankfurt", country: "Germany" },
    { lat: 43.254, lon: 6.637, city: "French Riviera", country: "France" },
    { lat: 32.650, lon: -16.908, city: "Funchal", country: "Portugal" },
    { lat: 36.140, lon: -5.353, city: "Gibraltar", country: "Gibraltar" },
    { lat: 57.708, lon: 11.974, city: "Gothenburg", country: "Sweden" },
    { lat: 53.548, lon: 9.987, city: "Hamburg", country: "Germany" },
    { lat: 60.169, lon: 24.938, city: "Helsinki", country: "Finland" },
    { lat: 39.020, lon: 1.482, city: "Ibiza", country: "Spain" },
    { lat: 50.450, lon: 30.523, city: "Kyiv", country: "Ukraine" },
    { lat: 61.115, lon: 10.466, city: "Lillehammer", country: "Norway" },
    { lat: 38.722, lon: -9.139, city: "Lisbon", country: "Portugal" },
    { lat: 51.507, lon: -0.127, city: "London", country: "England" },
    { lat: 40.416, lon: -3.703, city: "Madrid", country: "Spain" },
    { lat: 39.695, lon: 3.017, city: "Mallorca", country: "Spain" },
    { lat: 53.480, lon: -2.242, city: "Manchester", country: "England" },
    { lat: 43.296, lon: 5.369, city: "Marseille", country: "France" },
    { lat: 27.760, lon: -15.586, city: "Maspalomas", country: "Spain" },
    { lat: 45.464, lon: 9.190, city: "Milan", country: "Italy" },
    { lat: 48.135, lon: 11.582, city: "Munich", country: "Germany" },
    { lat: 40.851, lon: 14.268, city: "Naples", country: "Italy" },
    { lat: 43.034, lon: -2.417, city: "Oñati", country: "Spain" },
    { lat: 59.913, lon: 10.752, city: "Oslo", country: "Norway" },
    { lat: 48.856, lon: 2.352, city: "Paris", country: "France" },
    { lat: 50.075, lon: 14.437, city: "Prague", country: "Czech Republic" },
    { lat: 64.146, lon: -21.942, city: "Reykjavík", country: "Iceland" },
    { lat: 56.879, lon: 24.603, city: "Riga", country: "Latvia" },
    { lat: 41.902, lon: 12.496, city: "Rome", country: "Italy" },
    { lat: 39.453, lon: -31.127, city: "Santa Cruz das Flores", country: "Portugal" },
    { lat: 28.463, lon: -16.251, city: "Santa Cruz de Tenerife", country: "Spain" },
    { lat: 57.273, lon: -6.215, city: "Skye", country: "Scotland" },
    { lat: 42.697, lon: 23.321, city: "Sofia", country: "Bulgaria" },
    { lat: 59.329, lon: 18.068, city: "Stockholm", country: "Sweden" },
    { lat: 59.437, lon: 24.753, city: "Tallinn", country: "Estonia" },
    { lat: 48.208, lon: 16.373, city: "Vienna", country: "Austria" },
    { lat: 52.229, lon: 21.012, city: "Warsaw", country: "Poland" },
    { lat: 53.961, lon: -1.07, city: "York", country: "England" },
    { lat: 47.376, lon: 8.541, city: "Zurich", country: "Switzerland" }
];

// Function to populate datalist
function populateCitySuggestions() {
    const datalist = document.getElementById('citySuggestions');
    cityData.forEach(city => {
        const option = document.createElement('option');
        option.value = `${city.city}, ${city.country}`;
        option.dataset.lat = city.lat;
        option.dataset.lon = city.lon;
        datalist.appendChild(option);
    });
}