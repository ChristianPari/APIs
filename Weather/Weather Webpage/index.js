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
        curButton = createButton({ id: `curButton`, text: `Search`, onClickFunc: `` }),
        histButton = createButton({ id: `histButton`, text: `Search`, onClickFunc: `` }),
        years = Array.from({ length: dateInfo.year + 1 }, (a, b) => b).slice(2000 - dateInfo.year).reverse(),
        yearSelect = createSelect({ id: `yearSelect`, defOp: `Select a Year`, defOpID: `defaultYear`, data: years, onChangeFunc: yearSelected }),
        monthSelect = createSelect({ id: `monthSelect`, defOp: `Select a Year First`, defOpID: `defaultMonth`, data: [] }), // will fill data in year onchange function
        daySelect = createSelect({ id: `daySelect`, defOp: `Select a Month First`, defOpID: `defaultDay`, data: [] }); // will fill data in month onchange function

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