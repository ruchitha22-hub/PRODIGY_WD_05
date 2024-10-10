const apiKey = '4dd13f8780262788f03089ea3f48d557'; // Replace with your actual API key
const fetchWeatherBtn = document.getElementById('fetchWeatherBtn');
const locationInput = document.getElementById('locationInput');
const weatherInfo = document.getElementById('weatherInfo');

fetchWeatherBtn.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            weatherInfo.innerHTML = `<p>${error.message}</p>`;
        });
}

function displayWeather(data) {
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;
    const city = data.name;
    const country = data.sys.country;

    weatherInfo.innerHTML = `
        <h2>${city}, ${country}</h2>
        <p>Temperature: ${temperature} °C</p>
        <p>Condition: ${weatherDescription}</p>
    `;
}
