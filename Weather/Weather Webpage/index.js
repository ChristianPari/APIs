let owKey = `c81d51bf76bfdeb0cf59fa68e2336eb5`,
    metKey = `UcUSKkeI`,
    body = document.body;

window.onload = () => {

    /*
    will probably add some description for each weather div explaining what it does
    */

    let title = createHeading({ text: `Weather At Your Fingertips`, size: 1, id: `mainHead` }),
        mainDiv = createDiv({ id: `mainDiv` }),
        curWeather = createDiv({ id: `curWeatherDiv` }),
        histWeather = createDiv({ id: `histWeatherDiv` }),
        copyRightDiv = createDiv({ id: `copyRightDiv` }),
        curDesc = createParagraph({ id: `curDesc`, text: `Search for any city in the world and see what the weather is like there!` }),
        histDesc = createParagraph({ id: `histDesc`, text: `Go back in time with this Historical Weather Data Puller! Choose a date and then search a location.\nThis Data Puller uses weather stations from around the world so unfortunately not every city or location may have one designated with their name. So if your search comes back with nothing found or not the area you were looking for, please modify your search to another area close to your search!` }),
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
    curWeather.appendChild(curDesc);
    curWeather.appendChild(curUiDiv);
    curWeather.appendChild(curDataDiv);
    curUiDiv.appendChild(curInput);
    curUiDiv.appendChild(curButton);
    histWeather.appendChild(histDesc);
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

        displayCurData(weatherData);

    };

    xhr.send();

};

function displayCurData(curData) {

    let xhr = new XMLHttpRequest(),
        endpoint = curData.sys.country.length > 2 ? `https://restcountries.eu/rest/v2/alpha/${curData.sys.country}` : `https://restcountries.eu/rest/v2/alpha/${curData.sys.country}`;

    xhr.open('GET', endpoint, false);

    xhr.onload = () => {

        let res = JSON.parse(xhr.responseText),
            location = `${curData.name}, ${res.name}`;

        curData.name = location;

    };

    xhr.send();

    let locationDiv = createDiv({ id: ``, class: `locationDivs` }),
        location = createHeading({ text: curData.name, size: 3, id: ``, class: `locations` }),
        weatherInfoDiv = createDiv({ id: ``, class: `infoDivs` }),
        weatherCondDiv = createDiv({ id: ``, class: `conditionDivs` }),
        sun = createHeading({ text: `Sunrise: ${convertUnix(curData.sys.sunrise)} AM / Sunset: ${convertUnix(curData.sys.sunset)} PM`, size: 4, class: `curConditions`, id: `` }),
        humidity = createHeading({ text: `Humidity: ${Math.round(curData.main.humidity)}%`, size: 4, id: ``, class: `curConditions` }),
        feelsLike = createHeading({ text: `Feels Like: ${Math.round(curData.main.feels_like)}°F`, size: 4, id: ``, class: `curConditions` }),
        curTemp = createHeading({ text: `Current Temperature: ${Math.round(curData.main.temp)}°F`, size: 4, id: ``, class: `curConditions` }),
        tempRange = createHeading({ text: `High: ${Math.round(curData.main.temp_max)}°F / Low: ${Math.round(curData.main.temp_min)}°F`, size: 4, id: ``, class: `curConditions` }),
        pressure = createHeading({ text: `Air Pressure: ${Math.round(curData.main.pressure)} hPa`, size: 4, id: ``, class: `curConditions` }),
        windSpeed = createHeading({ text: `Wind Speed: ${Math.round(curData.wind.speed)}mph / Gusts: ${Math.round(curData.wind.gust)}mph`, size: 4, class: `curConditions`, id: `` }),
        windDirection = createHeading({ text: `Wind Direction: ${curData.wind.deg}°`, class: `curConditions`, id: ``, size: 4 }),
        conditionsImg = createImage({ src: `http://openweathermap.org/img/wn/${curData.weather[0].icon}.png`, alt: `weather icon image`, id: ``, class: `icons` }),
        conditionDesc = createHeading({ text: `${curData.weather[0].description.toUpperCase()}`, id: ``, class: `conditionDescs` }),
        deleteButton = createButton({ text: `X`, onClickFunc: deleteDiv, class: `deleteButtons`, id: `` });

    document.getElementById(`curDataDiv`).appendChild(locationDiv);
    locationDiv.appendChild(location);
    locationDiv.appendChild(weatherInfoDiv);
    weatherInfoDiv.appendChild(conditionsImg);
    weatherInfoDiv.appendChild(conditionDesc);
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
        stationFilter(wStations);

    }

    xhr.send();

};

function stationFilter(stations) {

    if (stations.length == 0) {

        alert(`No weather stations found, please try another search`);
        return

    } else if (stations.length == 1) {

        singleStation(stations[0]); // function to get country name from RESTCountries API

    } else {

        multipleStations(stations);

    }

};

function singleStation(station) {

    let xhr = new XMLHttpRequest(),
        endpoint = station.country.length > 2 ? `https://restcountries.eu/rest/v2/alpha/${station.country}` : `https://restcountries.eu/rest/v2/alpha/${station.country}`;

    xhr.open('GET', endpoint);

    xhr.onload = () => {

        let res = JSON.parse(xhr.responseText),
            location = `${station.name}, ${res.name}`,
            okay = confirm(`You're search came back with only one result: ${location}.\nClick 'Ok' if that is the desired location.\nClick 'Cancel' to make a new search.`);

        station.name = `${location}`; // combines name, easier for later

        if (okay) { getHistData(station); }

    };

    xhr.send();

};

function multipleStations(wStations) {

    wStations.forEach(station => {

        let xhr = new XMLHttpRequest(),
            endpoint = station.country.length > 2 ? `https://restcountries.eu/rest/v2/alpha/${station.country}` : `https://restcountries.eu/rest/v2/alpha/${station.country}`;

        xhr.open('GET', endpoint, false);

        xhr.onload = () => {

            let res = JSON.parse(xhr.responseText),
                location = `${station.name}, ${res.name}`;

            station.name = location; // combines name, easier for later

        };

        xhr.send();

    });

    if (document.getElementById(`stationSelect`) != null) { document.getElementById(`stationSelect`).remove() };
    if (document.getElementById(`cancelButton`) != null) { document.getElementById(`cancelButton`).remove() };

    let histUiDiv = document.getElementById(`histUiDiv`),
        stationSelect = document.createElement(`select`),
        cancelButton = createButton({ id: `cancelButton`, text: `Cancel`, onClickFunc: cancelProcess });

    stationSelect.id = `stationSelect`;
    stationSelect.size = wStations.length;

    for (let a = 0; a < wStations.length; a++) {

        console.log(wStations[a]);

        let option = document.createElement(`option`);

        option.innerHTML = wStations[a].name;
        option.value = wStations[a].id;

        stationSelect.appendChild(option);

    }

    histUiDiv.appendChild(stationSelect);
    histUiDiv.appendChild(cancelButton);
    document.getElementById(`yearSelect`).style.display = `none`;
    document.getElementById(`monthSelect`).style.display = `none`;
    document.getElementById(`daySelect`).style.display = `none`;
    document.getElementById(`histInput`).style.display = `none`;
    document.getElementById(`histButton`).style.display = `none`;

    stationSelect.onchange = () => {

        getHistData({ id: stationSelect.value, name: stationSelect.options[stationSelect.selectedIndex].text });
        document.getElementById(`stationSelect`).style.display = `none`;
        document.getElementById(`cancelButton`).style.display = `none`;
        document.getElementById(`yearSelect`).style.display = `initial`;
        document.getElementById(`monthSelect`).style.display = `initial`;
        document.getElementById(`daySelect`).style.display = `initial`;
        document.getElementById(`histInput`).style.display = `initial`;
        document.getElementById(`histButton`).style.display = `initial`;

    }

};

function getHistData(stationInfo) {

    let xhr = new XMLHttpRequest(),
        month = dateInfo.month < 10 ? `0` + dateInfo.month : dateInfo.month,
        day = dateInfo.day < 10 ? `0` + dateInfo.day : dateInfo.day,
        startDate = `${dateInfo.year}-${month}-${day}`,
        endpoint = `https://api.meteostat.net/v1/history/daily?key=${metKey}&station=${stationInfo.id}&start=${startDate}&end=${startDate}`;

    xhr.open('GET', endpoint);

    xhr.onload = () => {

        let res = JSON.parse(xhr.responseText);
        displayHistData(res.data[0], stationInfo.name);

    };

    xhr.send();

};

function displayHistData(histData, stationName) {

    if (histData != null) {

        let stationDiv = createDiv({ class: `stationDivs`, id: `` }),
            weatherDiv = createDiv({ class: `weatherDivs`, id: `` }),
            nameHead = createHeading({ text: stationName, size: 3, id: ``, class: `stationNames` });

        weatherDiv.appendChild(nameHead);

        for (const k in histData) {

            if (histData[k] != null) {

                let converted = convertData(k, histData[k]),
                    element = createHeading({ text: converted, class: `histConditions`, id: ``, size: 4 });

                weatherDiv.appendChild(element);

            }

        }

        let deleteButton = createButton({ text: `X`, onClickFunc: deleteDiv, class: `deleteButtons`, id: `` });

        stationDiv.appendChild(deleteButton);
        stationDiv.appendChild(weatherDiv);
        document.getElementById(`histDataDiv`).appendChild(stationDiv);

    } else {

        alert(`Unfortunately there is no weather data for this day`);
        return

    }

};

function convertData(key, value) {

    switch (key) {

        case `peakgust`:

            return `Wind Gusts: ${Math.round(value / 1.609344)} mph`

        case `windspeed`:

            let speed = Math.round(value / 1.609344) < 1 ? (value / 1.609344).toFixed(2) : Math.round(value / 1.609344);

            return `Max Wind Speed: ${speed} mph`

        case `precipitation`:

            return `Rainfall total: ${Math.round(value / 25.4)} in`

        case `pressure`:

            return `Air Pressure: ${value.toFixed(2)} hPa`

        case `snowdepth`:

            return `Snow Depth: ${Math.round(value / 2.54)} in`

        case `snowfall`:

            return `Snowfall total: ${Math.round(value / 2.54)} in`

        case `temperature`:

            return `Average Temperature: ${Math.round((value * 9 / 5) + 32)}°F`

        case `temperature_max`:

            return `High Temperature: ${Math.round((value * 9 / 5) + 32)}°F`

        case `temperature_min`:

            return `Low Temperature: ${Math.round((value* 9 / 5) + 32)}°F`

        case `winddirection`:

            return getWindDirection(value)

        case `date`:

            return convertDate(value)

        case `sunshine`:

            return `Sunshine for: ${value} hours`

    }

};

function getWindDirection(value) {
    let windDir = value,
        direction = ``;

    if (windDir < 22.5) {

        direction = `Wind Direction: N ${windDir}°`;

    } else if (windDir >= 22.5 && windDir < 45) {

        direction = `Wind Direction: NNE ${windDir}°`;

    } else if (windDir >= 45 && windDir < 67.5) {

        direction = `Wind Direction: NE ${windDir}°`;

    } else if (windDir >= 67.5 && windDir < 90) {

        direction = `Wind Direction: ENE ${windDir}°`;

    } else if (windDir >= 90 && windDir < 112.5) {

        direction = `Wind Direction: E ${windDir}°`;

    } else if (windDir >= 112.5 && windDir < 135) {

        direction = `Wind Direction: ESE ${windDir}°`;

    } else if (windDir >= 135 && windDir < 157.5) {

        direction = `Wind Direction: SE ${windDir}°`;

    } else if (windDir >= 157.5 && windDir < 180) {

        direction = `Wind Direction: SSE ${windDir}°`;

    } else if (windDir >= 180 && windDir < 202.5) {

        direction = `Wind Direction: S ${windDir}°`;

    } else if (windDir >= 202.5 && windDir < 225) {

        direction = `Wind Direction: SSW ${windDir}°`;

    } else if (windDir >= 225 && windDir < 247.5) {

        direction = `Wind Direction: SW ${windDir}°`;

    } else if (windDir >= 247.5 && windDir < 270) {

        direction = `Wind Direction: WSW ${windDir}°`;

    } else if (windDir >= 270 && windDir < 292.5) {

        direction = `Wind Direction: W ${windDir}°`;

    } else if (windDir >= 292.5 && windDir < 315) {

        direction = `Wind Direction: WNW ${windDir}°`;

    } else if (windDir >= 315 && windDir < 337.5) {

        direction = `Wind Direction: NW ${windDir}°`;

    } else if (windDir >= 337.5) {

        direction = `Wind Direction: NNW ${windDir}°`;

    }

    return direction

};

function convertDate(value) {

    value = value.replace(/-/g, ` `).split(` `);
    let dateArr = [];

    value.forEach(data => {
        dateArr.push(Number(data));
    });

    return `${monthNames[dateArr[1]-1]} ${dateArr[2]}, ${dateArr[0]}`

}

function deleteDiv() {

    this.parentNode.remove();

};

function cancelProcess() {

    document.getElementById(`stationSelect`).style.display = `none`;
    document.getElementById(`cancelButton`).style.display = `none`;
    document.getElementById(`yearSelect`).style.display = `initial`;
    document.getElementById(`monthSelect`).style.display = `initial`;
    document.getElementById(`daySelect`).style.display = `initial`;
    document.getElementById(`histInput`).style.display = `initial`;
    document.getElementById(`histButton`).style.display = `initial`;

};