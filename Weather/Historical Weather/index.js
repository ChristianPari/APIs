const apiKey = `UcUSKkeI`;

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
        submitButton = createButton({ id: `submitButton`, text: `Request Weather Data`, onClickFunc: stationReq });

    cityInput.onkeyup = testUserSubmit;
    submitButton.style.display = `none`;
    copyrightDiv.innerHTML = `Data provided by <a href="https://www.meteostat.net" title="meteostat" target="_blank">meteostat</a>. Meteorological data: Copyright &copy; National Oceanic and Atmospheric Administration (NOAA), Deutscher Wetterdienst (DWD). Learn more about the <a href="https://www.meteostat.net/sources" title="meteostat Sources" target="_blank">sources</a>.`;

    body.appendChild(mainHead);
    body.appendChild(uiDiv);
    body.appendChild(weatherDiv);
    body.appendChild(copyrightDiv);
    uiDiv.appendChild(dateHead);
    uiDiv.appendChild(submitButton);
    uiDiv.appendChild(cityInput);
    uiDiv.appendChild(yearSelect);

};

function testUserSubmit() { // SANATIZE THE USER INPUT

    let userInput = document.getElementById(`cityInput`).value.replace(/^\s{1,}/g, ``).replace(/\s{2,}/g, ` `),
        //^ first replace deletes spaces at beginning, second deletes extras afterwards
        submitButton = document.getElementById(`submitButton`),
        nums = /[0-9]/g;

    if (userInput.length < 3 || userInput.length > 58 || nums.test(userInput) || !userProvidedDate) {

        submitButton.style.display = `none`;

    } else {

        submitButton.style.display = `initial`;

    }

}

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

}

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
        document.getElementById(`submitButton`).style.display = `none`;
        document.getElementById(`cityInput`).style.display = `none`;
        document.getElementById(`yearSelect`).style.display = `none`;

        stationSelect.onchange = () => {

            reqHistorical({ id: stationSelect.value });
            document.getElementById(`stationSelect`).style.display = `none`;
            document.getElementById(`cancelButton`).style.display = `none`;
            document.getElementById(`submitButton`).style.display = `initial`;
            document.getElementById(`cityInput`).style.display = `initial`;
            document.getElementById(`yearSelect`).style.display = `initial`;

        };


    }

}


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

        console.log(weatherData); // displays to the console the weather data for that day in an object; displays a blank array if no data for that day

        if (weatherData != undefined) {

            // display info to the DOM

        } else {

            alert(`Unfortunately, there is no data for this location on this day.\nPlease search for a more current date.`);

        }

    };

    xhr.send();

}

function cancelProcess() {

    document.getElementById(`stationSelect`).style.display = `none`;
    document.getElementById(`cancelButton`).style.display = `none`;
    document.getElementById(`submitButton`).style.display = `initial`;
    document.getElementById(`cityInput`).style.display = `initial`;
    document.getElementById(`yearSelect`).style.display = `initial`;


}