/*
APIs
current weather
https://api.openweathermap.org/data/2.5/weather?appid={your api key}&q={query}

historical weather
https://api.meteostat.net/v1/stations/search?key=${api Key}&q=${city Name} gets weather stations
https://api.meteostat.net/v1/history/daily?key=${api Key}&station=${station id}&start=${start Date}&end=${end Date} gets weather data
*/

let owKey = `ADD API KEY`,
    metKey = `ADD API KEY`,
    body = document.body,
    condtionImgs = { // GLOBAL VARIABLES FOR BACKGROUND IMAGES
        1: `https://hoodline.imgix.net/uploads/story/image/582979/istock__..featured_image_1..sunny_3.jpg.jpg?auto=format`,
        2: `https://c1.wallpaperflare.com/preview/586/645/192/japan-sea-winter-road-hokkaido-sea-it-was-cloudy-weather.jpg`,
        3: `https://c1.wallpaperflare.com/preview/586/645/192/japan-sea-winter-road-hokkaido-sea-it-was-cloudy-weather.jpg`,
        4: `https://c1.wallpaperflare.com/preview/586/645/192/japan-sea-winter-road-hokkaido-sea-it-was-cloudy-weather.jpg`,
        9: `https://i.pinimg.com/originals/33/39/a5/3339a59d7b0697e11dc11a12f921abca.jpg`,
        10: `https://i.pinimg.com/originals/33/39/a5/3339a59d7b0697e11dc11a12f921abca.jpg`,
        11: `https://i2-prod.nottinghampost.com/incoming/article3008203.ece/ALTERNATES/s1200b/2_Thunderstorm-at-sunset.jpg`,
        13: `https://www.wallpaperflare.com/static/861/598/512/winter-snow-dawn-footprints-wallpaper.jpg`,
        50: `https://c1.wallpaperflare.com/preview/124/91/824/winding-road-railing-guard-rail.jpg`

    };

window.onload = () => {

    /*
    will probably add some description for each weather div explaining what it does
    */

    let title = createHeading({ text: `Weather At Your Fingertips`, size: 1, id: `mainHead` }),
        mainDiv = createDiv({ id: `mainDiv` }),
        curWeather = createDiv({ id: `curWeatherDiv` }),
        histWeather = createDiv({ id: `histWeatherDiv` }),
        copyRightDiv = createDiv({ id: `copyRightDiv` }),
        curUiDiv = createDiv({ id: `curUiDiv` }),
        histUiDiv = createDiv({ id: `histUiDiv` }),
        curDataDiv = createDiv({ id: `curDataDiv` }),
        histDataDiv = createDiv({ id: `histDataDiv` }),
        curInput = createInput({ id: `curInput`, sCheck: true, pHolder: `City, State, Country Code` }),
        histInput = createInput({ id: `histInput`, sCheck: true, pHolder: `City, Country Code` }),
        curButton = createButton({ id: `curButton`, text: `Search`, onClickFunc: curStart }),
        histButton = createButton({ id: `histButton`, text: `Search`, onClickFunc: histStart }),
        years = Array.from({ length: dateInfo.year + 1 }, (a, b) => b).slice(2000 - dateInfo.year).reverse(),
        yearSelect = createSelect({ id: `yearSelect`, defOp: `Select a Year`, defOpID: `defaultYear`, data: years, onChangeFunc: yearSelected }),
        monthSelect = createSelect({ id: `monthSelect`, defOp: `Select a Year First`, defOpID: `defaultMonth`, data: [] }), // will fill data in year onchange function
        daySelect = createSelect({ id: `daySelect`, defOp: `Select a Month First`, defOpID: `defaultDay`, data: [] }); // will fill data in month onchange function

    copyRightDiv.innerHTML = `Data provided by <a href="https://www.meteostat.net" title="meteostat" target="_blank">meteostat</a>. Meteorological data: Copyright &copy; National Oceanic and Atmospheric Administration (NOAA), Deutscher Wetterdienst (DWD). Learn more about the <a href="https://www.meteostat.net/sources" title="meteostat Sources" target="_blank">sources</a>.`;

    body.appendChild(title);
    body.appendChild(mainDiv);
    body.appendChild(copyRightDiv);
    mainDiv.appendChild(curWeather);
    mainDiv.appendChild(histWeather);
    curWeather.appendChild(curUiDiv);
    curWeather.appendChild(curDataDiv);
    curUiDiv.appendChild(curInput);
    curUiDiv.appendChild(curButton);
    histWeather.appendChild(histUiDiv);
    histWeather.appendChild(histDataDiv);
    histUiDiv.appendChild(yearSelect);
    histUiDiv.appendChild(monthSelect);
    histUiDiv.appendChild(daySelect);
    histUiDiv.appendChild(histInput);
    histUiDiv.appendChild(histButton);

};

function curStart() {

    let curInput = document.getElementById(`curInput`).value.replace(/^\s{1,}/g, ``).replace(/\s{2,}/g, ` `),
        numRegex = /[0-9]/g,
        aplha = /[A-z]/g,
        query;

    if (curInput.length < 3 || curInput.length > 60) { // runs if isnt a valid length

        alert(`Not a valid City or Zipcode, please try again!\n*Search must be between 3-60 characters*`);
        return

    } else if (numRegex.test(curInput) && aplha.test(curInput)) { // runs if input contains a mix of numbers and letters

        alert(`There cannot be numbers and letters in your search`);
        return

    } else if (!aplha.test(curInput) && curInput.match(numRegex).length === 5) { // valid zipcode

        query = `&zip=${curInput}`;

    } else if (aplha.test(curInput)) { // valid string

        query = `&q=${curInput}`;

    } else { // only can be invalid zipcode

        alert(`The numbers you have entered are not a valid zipcode`);
        return

    }

    const xhr = new XMLHttpRequest(),
        endpoint = `http://api.openweathermap.org/data/2.5/weather?appid=${owKey}&units=imperial${query}`;

    xhr.open('GET', endpoint);

    xhr.onload = () => {

        const weatherData = JSON.parse(xhr.responseText);

        if (weatherData.cod != 200) {

            alert(`The location you are searching for cannot be found, please try again`);
            return

        }

        displayData(weatherData);

    };

    xhr.send();

};

function displayData(data) {

    let locationDiv = createDiv({ id: ``, class: `locationDivs` }),
        locationName = `${data.name}, ${data.sys.country}`,
        location = createHeading({ text: locationName, size: 3, id: ``, class: `locations` }),
        weatherInfoDiv = createDiv({ id: ``, class: `infoDivs` }),
        weatherCondDiv = createDiv({ id: ``, class: `conditionDivs` }),
        sun = createHeading({ text: `Sunrise: ${convertUnix(data.sys.sunrise)} AM / Sunset: ${convertUnix(data.sys.sunset)} PM`, size: 4, class: `conditions`, id: `` }),
        humidity = createHeading({ text: `Humidity: ${Math.round(data.main.humidity)}%`, size: 4, id: ``, class: `conditions` }),
        feelsLike = createHeading({ text: `Feels Like: ${Math.round(data.main.feels_like)}°F`, size: 4, id: ``, class: `conditions` }),
        curTemp = createHeading({ text: `Current Temperature: ${Math.round(data.main.temp)}°F`, size: 4, id: ``, class: `conditions` }),
        tempRange = createHeading({ text: `High: ${Math.round(data.main.temp_max)}°F / Low: ${Math.round(data.main.temp_min)}°F`, size: 4, id: ``, class: `conditions` }),
        pressure = createHeading({ text: `Air Pressure: ${Math.round(data.main.pressure)} hPa`, size: 4, id: ``, class: `conditions` }),
        windSpeed = createHeading({ text: `Wind Speed: ${Math.round(data.wind.speed)}mph / Gusts: ${Math.round(data.wind.gust)}mph`, size: 4, class: `conditions`, id: `` }),
        windDirection = createHeading({ text: `Wind Direction: ${data.wind.deg}°`, class: `conditions`, id: ``, size: 4 }),
        conditionsImg = createImage({ src: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`, alt: `weather icon image`, id: ``, class: `icons` }),
        deleteButton = createButton({ text: `X`, onClickFunc: deleteDiv, class: `deleteButtons`, id: `` });

    // Assigns background image to each location
    if (Number(data.weather[0].icon.substr(0, 2) < 10)) {

        locationDiv.style.backgroundImage = `url(${condtionImgs[data.weather[0].icon.substr(1, 1)]})`;

    } else {

        locationDiv.style.backgroundImage = `url(${condtionImgs[data.weather[0].icon.substr(0, 2)]})`;

    }

    document.getElementById(`curDataDiv`).appendChild(locationDiv);
    locationDiv.appendChild(location);
    locationDiv.appendChild(weatherInfoDiv);
    weatherInfoDiv.appendChild(conditionsImg);
    weatherInfoDiv.appendChild(weatherCondDiv);
    weatherCondDiv.appendChild(curTemp);
    weatherCondDiv.appendChild(feelsLike);
    weatherCondDiv.appendChild(tempRange);
    weatherCondDiv.appendChild(sun);
    weatherCondDiv.appendChild(humidity);
    weatherCondDiv.appendChild(windSpeed);
    weatherCondDiv.appendChild(windDirection);
    weatherCondDiv.appendChild(pressure);
    locationDiv.appendChild(deleteButton);

};

function convertUnix(unix) {

    let milis = new Date(unix * 1000),
        hour = milis.getHours() > 12 ? milis.getHours() - 12 : milis.getHours(),
        min = milis.getMinutes() < 10 ? `0${milis.getMinutes()}` : milis.getMinutes(),
        time = `${hour}:${min}`;
    return time

}

function histStart() {

    let histInput = document.getElementById(`histInput`).value.replace(/^\s{1,}/g, ``).replace(/\s{2,}/g, ` `),
        numRegex = /[0-9]/g;

    console.log(histInput);

    if (histInput.length <= 2 || histInput.length >= 60 || numRegex.test(histInput)) {

        alert(`A valid search has between 3-60 characters and does not contain numbers, please modify your search to fit this critera`);
        return

    } else if (!userProvidedDate) {

        alert(`Please provide a date for your search`);
        return

    }

    let xhr = new XMLHttpRequest(),
        endpoint = `https://api.meteostat.net/v1/stations/search?key=${metKey}&q=${histInput}`;

    xhr.open('GET', endpoint);

    xhr.onload = () => {

        let res = JSON.parse(xhr.responseText),
            wStations = res.data;

        // function for filtering station data from the API request JSON object    
        // stationFilter(wStations);

    }

    xhr.send();

};

function deleteDiv() {

    this.parentNode.remove();

};