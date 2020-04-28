const apiKey = `ADD API KEY`;

// ALL MAIN HTML ELEMENTS WILL BE CREATED
window.onload = () => {

    let body = document.body,
        mainHead = createHeading({ text: `Historical Weather at Your Fingertips`, size: 1, id: `mainHead` }),
        dateHead = createHeading({ text: `${monthNames[dateInfo.month - 1]} ${dateInfo.day}, ${dateInfo.year}`, id: `dateHead`, size: 3 }),
        uiDiv = createDiv({ id: `uiDiv` }),
        weatherDiv = createDiv({ id: `weatherDiv` }),
        yearArr = Array.from({ length: dateInfo.year + 1 }, (a, b) => b).slice(dateInfo.year - 40).reverse(), // Creates an array in a single line of code
        yearSelect = createSelect({ data: yearArr, defOp: `Select A Year`, onChangeFunc: yearSelected, id: `yearSelect` }),
        cityInput = createInput({ pHolder: `City, Country Code`, id: `cityInput`, sCheck: true }),
        submitButton = createButton({ id: `submitButton`, text: `Request Weather Data`, onClickFunc: reqAPI });

    body.appendChild(mainHead);
    body.appendChild(uiDiv);
    body.appendChild(weatherDiv);
    uiDiv.appendChild(dateHead);
    uiDiv.appendChild(submitButton);
    uiDiv.appendChild(cityInput);
    uiDiv.appendChild(yearSelect);

};

function reqAPI() {

    let weatherDiv = document.getElementById(`weatherDiv`),
        cityInput = document.getElementById(`cityInput`),
        cityName = document.getElementById(`cityInput`).value.replace(/\s{2,}/g, ` `),
        start = new Date(`${dateInfo.month} ${dateInfo.day}, ${dateInfo.year}`).getTime(),
        end = start + (8.64 * Math.pow(10, 7)), // adding a days worth of milliseconds to the end so that the end is the next day
        nums = /[0-9]/g;

    // SANATIZE THE USER INPUT
    if (cityName == ``) {

        cityInput.placeholder = `Please Input A City`;
        return

    } else if (cityName < 3 || cityName > 33 || nums.test(cityName)) {

        alert(`Please make sure the city entered in a real city`);
        return

    }



    let xhr = new XMLHttpRequest(),
        endpoint = `http://history.openweathermap.org/data/2.5/history/city?appid=${apiKey}&q=${cityName}&type=hour&start=${start}&end=${end}`;

    xhr.open('GET', endpoint);

    xhr.onload = () => {

        let res = JSON.parse(xhr.responseText);

        console.log(res);

    }

    xhr.send();

}