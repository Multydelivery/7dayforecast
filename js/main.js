// DOM Elements
const elements = {
    cityInput: document.getElementById('cityInput'),
    getWeatherBtn: document.getElementById('getWeatherBtn'),
    coordinatesDisplay: document.getElementById('coordinatesDisplay'),
    countryDisplay: document.getElementById('countryDisplay'),
    currentWeather: document.getElementById('currentWeather'),
    forecast: document.getElementById('forecast'),
    weatherContainer: document.getElementById('weatherContainer')
};

// Initialize the app
function init() {
    if (!elements.cityInput || !elements.getWeatherBtn) {
        console.error('Essential DOM elements not found.');
        return;
    }
    populateCitySuggestions();
    elements.getWeatherBtn.addEventListener('click', handleCitySearch);
    elements.cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleCitySearch();
    });
}

// Handle city search
function handleCitySearch() {
    const cityName = elements.cityInput.value.trim();
    if (!cityName) return;

    const city = findCityData(cityName);
    if (city) {
        displayCityInfo(city);
        fetchWeatherData(city.lon, city.lat);
        elements.cityInput.value = '';
        elements.cityInput.focus();
    } else {
        showError('City not found in our database. Please try another European city.');
    }
}

// Find city in dataset
function findCityData(cityName) {
    const input = cityName.toLowerCase();
    return cityData.find(city =>
        city.city.toLowerCase().includes(input) ||
        `${city.city}, ${city.country}`.toLowerCase().includes(input)
    );
}

// Display city info
function displayCityInfo(city) {
    elements.coordinatesDisplay.textContent = `Lat: ${city.lat.toFixed(3)}, Lon: ${city.lon.toFixed(3)}`;
    elements.countryDisplay.textContent = `${city.city}, ${city.country}`;
}

// Fetch weather data from API (HTTPS)
async function fetchWeatherData(lon, lat) {
    showLoading();
    try {
        const response = await fetch(
            `https://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civil&output=json`
        );
        if (!response.ok) throw new Error('Failed to fetch weather data.');
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        showError('Unable to load weather data. Please try again later.');
        console.error('Error fetching weather:', error);
    }
}

// Display weather data
function displayWeatherData(data) {
    elements.currentWeather.innerHTML = '';
    elements.forecast.innerHTML = '';

    if (data.dataseries && data.dataseries.length > 0) {
        const current = data.dataseries[0];
        const date = new Date();
        const weatherCode = current.weather || current.prec_type || 'clearday';
        const weatherDesc = getWeatherDescription(weatherCode);

        elements.currentWeather.innerHTML = `
            <div class="current-temp">${current.temp2m}°C</div>
            <div class="weather-details">
                <h2>Current Weather</h2>
                <p>${date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
                <p>Condition: ${weatherDesc}</p>
                <p>Wind: ${current.wind10m.speed} m/s, ${current.wind10m.direction}</p>
                <p>Humidity: ${current.rh2m}%</p>
                <div class="weather-icon">${getWeatherIcon(weatherCode)}</div>
            </div>
        `;

        data.dataseries.slice(0, 7).forEach((day, index) => {
            const forecastDate = new Date();
            forecastDate.setDate(forecastDate.getDate() + index);
            const dayWeatherCode = day.weather || day.prec_type || 'clearday';

            elements.forecast.innerHTML += `
                <div class="forecast-day">
                    <h3>${forecastDate.toLocaleDateString('en-US', { weekday: 'short' })}</h3>
                    <p>${forecastDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                    <div class="weather-icon">${getWeatherIcon(dayWeatherCode)}</div>
                    <p class="temp">${day.temp2m}°C</p>
                    <p class="description">${getWeatherDescription(dayWeatherCode)}</p>
                </div>
            `;
        });
    } else {
        showError('No weather data available.');
    }
}

// (Optional) Display hourly forecast
function displayHourlyForecast(hourlyData) {
    const hourlyContainer = document.createElement('div');
    hourlyContainer.className = 'hourly-forecast';
    hourlyContainer.innerHTML = '<h3>Hourly Forecast</h3><div class="hourly-scroll"></div>';

    hourlyData.slice(0, 24).forEach(hour => {
        hourlyContainer.querySelector('.hourly-scroll').innerHTML += `
            <div class="hour">
                <p>${new Date(hour.timepoint * 1000).getHours()}:00</p>
                <div class="weather-icon">${getWeatherIcon(hour.weather)}</div>
                <p>${hour.temp2m}°C</p>
                <small>💧 ${hour.prec_amount || 0}mm</small>
            </div>
        `;
    });
    elements.weatherContainer.insertBefore(hourlyContainer, elements.forecast);
}

// Weather description helper
function getWeatherDescription(weatherCode) {
    const weatherMap = {
        'clearday': 'Clear sky',
        'clearnight': 'Clear sky',
        'pcloudyday': 'Partly cloudy',
        'pcloudynight': 'Partly cloudy',
        'mcloudyday': 'Mostly cloudy',
        'mcloudynight': 'Mostly cloudy',
        'cloudyday': 'Overcast',
        'cloudynight': 'Overcast',
        'humidday': 'Foggy',
        'humidnight': 'Foggy',
        'lightrainday': 'Light rain',
        'lightrainnight': 'Light rain',
        'oshowerday': 'Occasional showers',
        'oshowernight': 'Occasional showers',
        'ishowerday': 'Isolated showers',
        'ishowernight': 'Isolated showers',
        'lightsnowday': 'Light snow',
        'lightsnownight': 'Light snow',
        'rainday': 'Rain',
        'rainnight': 'Rain',
        'snowday': 'Snow',
        'snownight': 'Snow',
        'rainsnowday': 'Rain and snow',
        'rainsnownight': 'Rain and snow'
    };
    return weatherMap[weatherCode] || weatherCode;
}

// Weather icon helper
function getWeatherIcon(weatherCode) {
    const iconMap = {
        'clearday': '☀️',
        'clearnight': '🌙',
        'pcloudyday': '⛅',
        'pcloudynight': '☁️',
        'mcloudyday': '☁️',
        'mcloudynight': '☁️',
        'cloudyday': '☁️',
        'cloudynight': '☁️',
        'humidday': '🌫️',
        'humidnight': '🌫️',
        'lightrainday': '🌦️',
        'lightrainnight': '🌦️',
        'oshowerday': '🌦️',
        'oshowernight': '🌦️',
        'ishowerday': '🌦️',
        'ishowernight': '🌦️',
        'lightsnowday': '🌨️',
        'lightsnownight': '🌨️',
        'rainday': '🌧️',
        'rainnight': '🌧️',
        'snowday': '❄️',
        'snownight': '❄️',
        'rainsnowday': '🌨️',
        'rainsnownight': '🌨️'
    };
    return iconMap[weatherCode] || '🌈';
}

// Show loading state
function showLoading() {
    elements.currentWeather.innerHTML = '<div class="loading">Loading current weather...</div>';
    elements.forecast.innerHTML = '<div class="loading">Loading forecast...</div>';
}

// Show error message
function showError(message) {
    elements.weatherContainer.innerHTML = `<div class="error">${message}</div>`;
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);