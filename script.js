let appid = '4487dfe94d7a57abcd0fe5558fa2cd33'
let units = 'metric';
let searchMethod;

function getSearchMethod(searchTerm) {
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm) {
        searchMethod = 'zip';
    } else {
        searchMethod = 'q';
    }
}

function getWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appid}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

function init(resultFromServer) {
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("assets/img/clear.jpg")';
            break;
        case 'Clouds':
            document.body.style.backgroundImage = 'url("assets/img/cloudy.jpg")';
            break;
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url("assets/img/rain.jpg")';
            break;
        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("assets/img/storm.jpg")';
            break;
        case 'Snow':
            document.body.style.backgroundImage = 'url("assets/img/snow.jpg")';
            break;
    
        default:
            break;
    }

    let weatherDescHeader = document.getElementById('weather-desc-header');
    let temp = document.getElementById('temperature');
    let humidity = document.getElementById('humidity');
    let windSpeed = document.getElementById('wind-speed');
    let cityHeader = document.getElementById('city-header');
    let weatherIcon = document.getElementById('icon-img');

    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

    let resultDesc = resultFromServer.weather[0].description;
    weatherDescHeader.innerText = resultDesc.charAt(0).toUpperCase() + resultDesc.slice(1);
    temp.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176' + 'C';
    windSpeed.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
    cityHeader.innerHTML = resultFromServer.name;
    humidity.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';

    weatherInfo();
}

function weatherInfo() {
    let weatherContainer = document.getElementById('weather-container');
    let weatherContainerW = weatherContainer.clientWidth;
    let weatherContainerH = weatherContainer.clientHeight;

    weatherContainer.style.left = `calc(50% - ${weatherContainerW/2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerH/2}px)`;
    weatherContainer.style.visibility = 'visible';
}

document.getElementById('search-btn').addEventListener('click', () => {
    let searchTerm = document.getElementById('search-input').value;
    if (searchTerm) {
        getWeather(searchTerm);
    }
})