const apiKey = '29cfa38ccf9b5e3b62a6d8ffe63cd4a0';
const citynameInput = document.getElementById('cityname');
const searchBtn = document.getElementById('search-btn');
const locateBtn = document.getElementById('locate-btn');
const dateDaynameElement = document.getElementById('date-dayname');
const dateDayElement = document.getElementById('date-day');
const locationElement = document.getElementById('location');
const weatherTempElement = document.getElementById('weather-temp');
const weatherDescElement = document.getElementById('weather-desc');
const precipitationValueElement = document.getElementById('precipitation-value');
const humidityValueElement = document.getElementById('humidity-value');
const windValueElement = document.getElementById('wind-value');

// Function to fetch weather data by city name
const fetchWeatherByCityName = (cityname) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            const weatherData = data;
            const currentDate = new Date();
            dateDaynameElement.textContent = getDayName(currentDate.getDay());
            dateDayElement.textContent = `${currentDate.getDate()} ${getMonthName(currentDate.getMonth())}`;
            locationElement.textContent = weatherData.name;
            weatherTempElement.textContent = `${weatherData.main.temp}°C`;
            weatherDescElement.textContent = weatherData.weather[0].description;
            // Assuming precipitation data is in 'weatherData.rain' object
            const precipitation = weatherData.rain ? weatherData.rain['1h'] : 0; // Precipitation for the last hour
            precipitationValueElement.textContent = `${precipitation} mm`;
            humidityValueElement.textContent = `${weatherData.main.humidity}%`;
            windValueElement.textContent = `${weatherData.wind.speed} m/s`;
        })
        .catch(error => console.error(error));
};

// Function to fetch weather data by coordinates (for live location)
const fetchWeatherByCoordinates = (latitude, longitude) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            const weatherData = data;
            const currentDate = new Date();
            dateDaynameElement.textContent = getDayName(currentDate.getDay());
            dateDayElement.textContent = `${currentDate.getDate()} ${getMonthName(currentDate.getMonth())}`;
            locationElement.textContent = weatherData.name;
            weatherTempElement.textContent = `${weatherData.main.temp}°C`;
            weatherDescElement.textContent = weatherData.weather[0].description;
            // Assuming precipitation data is in 'weatherData.rain' object
            const precipitation = weatherData.rain ? weatherData.rain['1h'] : 0; // Precipitation for the last hour
            precipitationValueElement.textContent = `${precipitation} mm`;
            humidityValueElement.textContent = `${weatherData.main.humidity}%`;
            windValueElement.textContent = `${weatherData.wind.speed} m/s`;
        })
        .catch(error => console.error(error));
};

// Event listener for search button click
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const cityname = citynameInput.value.trim();
    if (cityname) {
        fetchWeatherByCityName(cityname);
    }
});

// Event listener for locate button click
locateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoordinates(latitude, longitude);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

// Function to get day name from index (0 to 6)
const getDayName = (day) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day];
};

// Function to get month name from index (0 to 11)
const getMonthName = (month) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month];
};
