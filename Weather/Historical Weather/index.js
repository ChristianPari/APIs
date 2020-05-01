const apiKey = `ADD API KEY`;

// ALL MAIN HTML ELEMENTS WILL BE CREATED
window.onload = () => {

    let body = document.body,
        mainHead = createHeading({ text: `Historical Weather at Your Fingertips`, size: 1, id: `mainHead` }),
        dateHead = createHeading({ text: `Today's Date<br>${monthNames[dateInfo.month - 1]} ${dateInfo.day}, ${dateInfo.year}`, id: `dateHead`, size: 3 }),
        uiDiv = createDiv({ id: `uiDiv` }),
        weatherDiv = createDiv({ id: `weatherDiv` }),
        copyrightDiv = createDiv({ id: `footer` }),
        yearArr = Array.from({ length: dateInfo.year + 1 }, (a, b) => b).slice(2000 - dateInfo.year).reverse(), // Creates an array in a single line of code
        yearSelect = createSelect({ data: yearArr, defOp: `Select A Year`, onChangeFunc: yearSelected, id: `yearSelect` }),
        cityInput = createInput({ pHolder: `Location Name`, id: `cityInput`, sCheck: true }),
        submitDate = createButton({ id: `submitDate`, text: `Get Weather For Selected Date`, onClickFunc: stationReq });

    cityInput.onkeyup = testUserSubmit;
    submitDate.style.display = `none`;
    copyrightDiv.innerHTML = `Data provided by <a href="https://www.meteostat.net" title="meteostat" target="_blank">meteostat</a>. Meteorological data: Copyright &copy; National Oceanic and Atmospheric Administration (NOAA), Deutscher Wetterdienst (DWD). Learn more about the <a href="https://www.meteostat.net/sources" title="meteostat Sources" target="_blank">sources</a>.`;

    body.appendChild(mainHead);
    body.appendChild(uiDiv);
    body.appendChild(weatherDiv);
    body.appendChild(copyrightDiv);
    uiDiv.appendChild(dateHead);
    uiDiv.appendChild(submitDate);
    uiDiv.appendChild(cityInput);
    uiDiv.appendChild(yearSelect);

};

function testUserSubmit() { // SANATIZE THE USER INPUT

    let userInput = document.getElementById(`cityInput`).value.replace(/^\s{1,}/g, ``).replace(/\s{2,}/g, ` `),
        //^ first replace deletes spaces at beginning, second deletes extras afterwards
        submitDate = document.getElementById(`submitDate`),
        nums = /[0-9]/g;

    if (userInput.length < 3 || userInput.length > 58 || nums.test(userInput) || !userProvidedDate) {

        submitDate.style.display = `none`;

    } else {

        submitDate.style.display = `initial`;

    }

};

function stationReq() {

    let cityName = document.getElementById(`cityInput`).value.replace(/\s{2,}/g, ` `).toLowerCase();

    let xhr = new XMLHttpRequest(),
        endpoint = `https://api.meteostat.net/v1/stations/search?key=${apiKey}&q=${cityName}`;

    xhr.open('GET', endpoint);

    xhr.onload = () => {

        let res = JSON.parse(xhr.responseText),
            wStations = res.data;

        stationFilter(wStations);

    }

    xhr.send();

};

function stationFilter(wStations) {

    if (wStations.length == 0) {

        alert(`No weather stations found with that search, please try another city in that area`);

    } else if (wStations.length === 1) {

        let okay = confirm(`You're search came back with ${wStations[0].name}, ${wStations[0].country}.\nClick 'Ok' if that is the desired location.\nClick 'Cancel' to make a new search.`);

        if (okay) {

            let stationObj = wStations[0];
            stationObj.name = `${stationObj.name}, ${stationObj.country}`;

            reqHistorical(stationObj);

        } else { return };

    } else {

        if (document.getElementById(`stationSelect`) != null) { document.getElementById(`stationSelect`).remove(); };

        if (document.getElementById(`cancelButton`) != null) { document.getElementById(`cancelButton`).remove(); };

        let stationSelect = createSelect({ id: `stationSelect`, defOp: `Select A Weather Station`, onChangeFunc: ``, data: `` }),
            cancelButton = createButton({ id: `cancelButton`, text: `Cancel`, onClickFunc: cancelProcess });

        for (let a = 0; a < wStations.length; a++) {

            let option = document.createElement(`option`);

            option.id = `${wStations[a].id}`;

            option.innerHTML = `${wStations[a].name}, ${wStations[a].country}`;

            option.value = `${wStations[a].id}`;

            stationSelect.appendChild(option);

        };

        document.getElementById(`uiDiv`).appendChild(stationSelect);
        document.getElementById(`uiDiv`).appendChild(cancelButton);
        document.getElementById(`submitDate`).style.display = `none`;
        document.getElementById(`cityInput`).style.display = `none`;
        document.getElementById(`yearSelect`).style.display = `none`;

        stationSelect.onchange = () => {

            reqHistorical({ id: stationSelect.value, name: stationSelect.options[stationSelect.selectedIndex].text });
            document.getElementById(`stationSelect`).style.display = `none`;
            document.getElementById(`cancelButton`).style.display = `none`;
            document.getElementById(`submitDate`).style.display = `initial`;
            document.getElementById(`cityInput`).style.display = `initial`;
            document.getElementById(`yearSelect`).style.display = `initial`;

        };


    }

};

function reqHistorical(stationObj) {

    let month = dateInfo.month < 10 ? `0` + dateInfo.month : dateInfo.month,
        day = dateInfo.day < 10 ? `0` + dateInfo.day : dateInfo.day,
        startDate = `${dateInfo.year}-${month}-${day}`,
        endDate = startDate;

    let xhr = new XMLHttpRequest(),
        endpoint = `https://api.meteostat.net/v1/history/daily?key=${apiKey}&station=${stationObj.id}&start=${startDate}&end=${endDate}`;

    xhr.open('GET', endpoint);

    xhr.onload = () => {

        let res = JSON.parse(xhr.responseText),
            weatherData = res.data[0];

        displayData(weatherData, stationObj);

    };

    xhr.send();

};

function cancelProcess() {

    document.getElementById(`stationSelect`).style.display = `none`;
    document.getElementById(`cancelButton`).style.display = `none`;
    document.getElementById(`submitDate`).style.display = `initial`;
    document.getElementById(`cityInput`).style.display = `initial`;
    document.getElementById(`yearSelect`).style.display = `initial`;


};

function displayData(weatherData, stationObj) {

    if (weatherData != undefined) {

        let stationDiv = createDiv({ id: ``, class: `stationDiv` }),
            weatherDiv = document.getElementById(`weatherDiv`),
            stationName = createHeading({ text: `${stationObj.name}`, size: 3, id: ``, class: `stationNames` });

        stationDiv.appendChild(stationName);

        for (let k in weatherData) {

            if (weatherData[k] != null) {

                let convertedData = convertData(k, weatherData[k]),
                    element = createHeading({ text: `${convertedData}`, size: 4, id: ``, class: `conditions` });

                stationDiv.appendChild(element);

            }

        }

        let deleteButton = createButton({ text: `X`, onClickFunc: deleteDiv, class: `deleteButtons`, id: `` });

        stationDiv.appendChild(deleteButton);
        weatherDiv.appendChild(stationDiv);

    } else {

        alert(`Unfortunately, there is no data for this location on this day.\nPlease search for a more current date.`);

    }

};

function convertData(key, value) {

    switch (key) {

        case `peakgust`:

            return `Wind Gusts of up to: ${Math.round(value / 1.609344)} mph`

        case `windspeed`:

            return `Wind Speed up to: ${Math.round(value / 1.609344)} mph`

        case `precipitation`:

            return `Rainfall total: ${Math.round(value / 25.4)} in`

        case `pressure`:

            return `Air Pressure: ${value} hPa`

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

    value.forEach(element => {
        dateArr.push(Number(element));
    });

    return `${monthNames[dateArr[1]-1]} ${dateArr[2]}, ${dateArr[0]}`

}

function deleteDiv() {

    this.parentNode.remove();

};