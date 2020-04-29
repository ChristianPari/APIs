const apiKey = `ADD API KEY`;

// ALL MAIN HTML ELEMENTS WILL BE CREATED
window.onload = () => {

    let body = document.body,
        mainHead = createHeading({ text: `Historical Weather at Your Fingertips`, size: 1, id: `mainHead` }),
        dateHead = createHeading({ text: `Today's Date<br>${monthNames[dateInfo.month - 1]} ${dateInfo.day}, ${dateInfo.year}`, id: `dateHead`, size: 3 }),
        uiDiv = createDiv({ id: `uiDiv` }),
        weatherDiv = createDiv({ id: `weatherDiv` }),
        copyrightDiv = createDiv({ id: `copyrightDiv` }),
        yearArr = Array.from({ length: dateInfo.year + 1 }, (a, b) => b).slice(dateInfo.year - 40).reverse(), // Creates an array in a single line of code
        yearSelect = createSelect({ data: yearArr, defOp: `Select A Year`, onChangeFunc: yearSelected, id: `yearSelect` }),
        cityInput = createInput({ pHolder: `City, Country Code`, id: `cityInput`, sCheck: true }),
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

        console.log(wStations); // displays to the console an array of objects; each object represents a weather station that this API pulled from the user input

        stationFilter(wStations);

    }

    xhr.send();

};

function stationFilter(wStations) {

    if (wStations.length == 0) {

        alert(`No weather stations found with that search, please try another city in that area`);

    } else if (wStations.length === 1) {

        let okay = confirm(`You're search came back with ${wStations[0].name}, ${wStations[0].country}.\nClick 'Ok' if that is the desired location.\nClick 'Cancel' to make a new search.`);

        if (okay) { reqHistorical(wStations[0]); } else { return };

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

        console.log(res); // displays to the console the weather data for that day in an object; displays a blank array if no data for that day

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

        let stationName = createHeading({ text: `${stationObj.name}`, id: `stationName`, size: 4 }),
            temp = createHeading({ text: `${weatherData.temperature != null && weatherData.temperature > 0.5 ? `Average Temperature: ${Math.round((weatherData.temperature * 9 / 5) + 32)}°F` : ``}`, class: `conditions`}),
            tempMax = createHeading({text: `${weatherData.temperature_max != null && weatherData.temperature_max > 0.5 ? `High Temperature: ${Math.round((weatherData.temperature_max * 9 / 5) + 32)}°F` : ``}`, class: `conditions`}),
            tempMin = createHeading({text: `${weatherData.temperature_min != null && weatherData.temperature_min > 0.5 ? `Low Temperature: ${Math.round((weatherData.temperature_min * 9 / 5) + 32)}°F` : ``}`, class: `conditions`}),
            sunshine = createHeading({text: `${weatherData.sunshine != null && weatherData.sunshine > 0.5 ? `Sunshine for: ${weatherData.sunshine} hours` : ``}`, class: `conditions`}),
            windDirection = createHeading({text: `${weatherData.winddirection != null && weatherData.winddirection > 0.5 ? `Wind Direction: ${weatherData.winddirection}°` : ``}`, class: `conditions`}),
            windSpeed = createHeading({text: `${weatherData.windspeed != null && weatherData.windspeed > 0.5 ? `Wind Speed up to: ${Math.round(weatherData.windspeed / 1.609344)} mph` : ``}`, class: `conditions`}),
            gusts = createHeading({text: `${weatherData.peakgust != null && weatherData.peakgust > 0.5 ? `Wind Gusts of up to: ${Math.round(weatherData.peakgust / 1.609344)} mph` : ``}`, class: `conditions`}),
            precip = createHeading({ text: `${weatherData.precipitation != null && weatherData.precipitation > 0.5 ? `Rainfall total: ${Math.round(weatherData.precipitation / 25.4)} in` : ``}`, class: `conditions`}),
            snowfall = createHeading({text: `${weatherData.snowfall != null && weatherData.snowfall > 0.5 ? `Snowfall total: ${Math.round(weatherData.snowfall / 2.54)} in` : ``}`, class: `conditions`}),
            snowDepth = createHeading({text: `${weatherData.snowdepth != null && weatherData.snowdepth > 0.5 ? `Current Snow Depth: ${Math.round(weatherData.snowdepth / 2.54)} in` : ``}`, class: `conditions`}),
            weatherDiv = document.getElementById(`weatherDiv`);

            if (weatherDiv.innerHTML != null) { weatherDiv.innerHTML = `` };

            weatherDiv.appendChild(stationName);
            weatherDiv.appendChild(temp);
            weatherDiv.appendChild(tempMax);
            weatherDiv.appendChild(tempMin);
            weatherDiv.appendChild(precip);
            weatherDiv.appendChild(sunshine);
            weatherDiv.appendChild(windDirection);
            weatherDiv.appendChild(windSpeed);
            weatherDiv.appendChild(gusts);
            weatherDiv.appendChild(snowfall);
            weatherDiv.appendChild(snowDepth);

    } else { alert(`Unfortunately, there is no data for this location on this day.\nPlease search for a more current date.`); }

};