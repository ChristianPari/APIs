/*
APIs
current weather
https://api.openweathermap.org/data/2.5/weather?appid={your api key}&q={query}

historical weather
https://api.meteostat.net/v1/stations/search?key=${api Key}&q=${city Name} gets weather stations
https://api.meteostat.net/v1/history/daily?key=${api Key}&station=${station id}&start=${start Date}&end=${end Date} gets weather data
*/

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

    // Create DOM display, allow user to be able to have multiple and have delete button

    // document.getElementById(`location`).innerText = `${data.name}`;
    // document.getElementById(`humidity`).innerText = `Humidity: ${Math.round(data.main.humidity)}%`;
    // document.getElementById(`feelsLike`).innerText = `Feels Like: ${Math.round(data.main.feels_like)}°F`;
    // document.getElementById(`curTenp`).innerText = `Current Temperature: ${Math.round(data.main.temp)}°F`;
    // document.getElementById(`maxT`).innerText = `High: ${Math.round(data.main.temp_max)}°F`;
    // document.getElementById(`minT`).innerText = `Low: ${Math.round(data.main.temp_min)}°F`;
    // document.getElementById(`conditionsImg`).src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    // document.getElementById(`conditionsImg`).style.display = `initial`;
    // document.getElementById(`conditionsDesc`).innerText = `${data.weather[0].description.toUpperCase()}`;
    // document.getElementById(`conditionsDesc`).style.display = `initial`;
    // if (Number(data.weather[0].icon.substr(0, 2) < 10)) {
    //     document.getElementById(`weatherInfo`).style.backgroundImage = `url(${condtionImgs[data.weather[0].icon.substr(1, 1)]})`;
    // } else {
    //     document.getElementById(`weatherInfo`).style.backgroundImage = `url(${condtionImgs[data.weather[0].icon.substr(0, 2)]})`;
    // }

};

function histStart() {

    let histInput = document.getElementById(`curInput`).value.replace(/^\s{1,}/g, ``).replace(/\s{2,}/g, ` `),
        numRegex = /[0-9]/g;

    if (histInput.length < 3 || histInput.length > 60 || numRegex.test(histInput)) {

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

        // stationFilter(wStations);

    }

    xhr.send();

};