const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-btn");
const temperature = document.getElementById("temperature");
const locationElement = document.getElementById("name-location");
const humidityValue = document.querySelector('.humidity .weather-value');
const windValue = document.querySelector('.wind-speed .weather-value');
const iconElement = document.getElementById("icon");

const getLocation = async () => {
    try {
        const cityName = searchBar.value.trim();
        if (!cityName) {
            alert('Please enter a city name');
            return;
        }
        
        const APIkey = "6506dac6711e0cfa4a9066c2fcfea8a0";
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        const temp = Math.round(data.main.temp);
        const speed = Math.round(data.wind.speed);

        temperature.textContent = `${temp}°C`;
        locationElement.textContent = `${data.name}`;
        humidityValue.textContent = `${data.main.humidity}%`;
        windValue.textContent = `${speed} km/h`;

        document.getElementById("humidity").classList.remove("hidden");
        document.getElementById("wind-speed").classList.remove("hidden");

        setWeatherIcon(data.weather[0].main, data.weather[0].description);

    } catch (err) {
        alert('Error fetching weather data. See console for details.');
        console.error('Error:', err);
    }
};

function setWeatherIcon(weatherMain, weatherDesc) {
    
    iconElement.className = '';
    iconElement.classList.add('fas');
    
    switch(weatherMain.toLowerCase()) {
        case 'clear':
            iconElement.classList.add('fa-sun');
            iconElement.classList.add('sun');
            break;
        case 'clouds':
            if (weatherDesc.includes('few') || weatherDesc.includes('scattered')) {
                iconElement.classList.add('fa-cloud-sun');
            } else {
                iconElement.classList.add('fa-cloud');
            }
            break;
        case 'rain':
            iconElement.classList.add('fa-cloud-rain');
            iconElement.classList.add('rain');
            break;
        case 'thunderstorm':
            iconElement.classList.add('fa-bolt');
            break;
        case 'snow':
            iconElement.classList.add('fa-snowflake');
            break;
        case 'mist':
        case 'smoke':
        case 'haze':
        case 'fog':
            iconElement.classList.add('fa-smog');
            break;
        default:
            iconElement.classList.add('fa-cloud');
    }
}

searchButton.addEventListener('click', () => {
    getLocation();
});

searchBar.addEventListener('keydown', e => {
    if (e.key === "Enter") {
        getLocation();
    }
});
