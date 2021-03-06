// GLOBAL VARIABLES FOR BACKGROUND IMAGES
let condtionImgs = {
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

    initialElms();

};

function initialElms() {

    let startBtn = createButton({ text: `Get Current Weather`, id: `startBtn`, onClickFunc: reqWeather }),
        title = createHeading({ text: `AnyWeather`, size: 1, id: `mainHead` }),
        mainDiv = createDiv({ id: `mainDiv` }),
        interactive = createDiv({ id: `interactive` }),
        cityNameInput = createInput({ sCheck: true, pHolder: `City, Country Code or Zipcode`, id: `cityInput` }),
        location = createHeading({ text: `Location`, size: 2, id: `location` }),
        weatherInfoDiv = createDiv({ id: `weatherInfo` }),
        weatherCond = createDiv({ id: `conditionsDiv` }),
        displayDiv = createDiv({ id: `conditionDisplay` }),
        humidity = createHeading({ text: `Humidity:`, size: 4, id: `humidity`, class: `conditions` }),
        feelsLike = createHeading({ text: `Feels Like:`, size: 4, id: `feelsLike`, class: `conditions` }),
        curTemp = createHeading({ text: `Current Temperature:`, size: 4, id: `curTenp`, class: `conditions` }),
        maxT = createHeading({ text: `High:`, size: 4, id: `maxT`, class: `conditions` }),
        minT = createHeading({ text: `Low:`, size: 4, id: `minT`, class: `conditions` }),
        conditionsImg = createImage({ src: ``, alt: ``, id: `conditionsImg` }),
        conditionsDesc = createHeading({ text: ``, size: 5, id: `conditionsDesc`, class: `conditions` });

    document.body.appendChild(title);
    document.body.appendChild(mainDiv);
    mainDiv.appendChild(interactive);
    interactive.appendChild(cityNameInput);
    interactive.appendChild(startBtn);
    mainDiv.appendChild(weatherInfoDiv);
    weatherInfoDiv.appendChild(location);
    weatherInfoDiv.appendChild(displayDiv);
    weatherInfoDiv.appendChild(weatherCond);
    displayDiv.appendChild(conditionsImg);
    displayDiv.appendChild(conditionsDesc);
    weatherCond.appendChild(curTemp);
    weatherCond.appendChild(feelsLike);
    weatherCond.appendChild(humidity);
    weatherCond.appendChild(maxT);
    weatherCond.appendChild(minT);
    conditionsImg.style.display = `none`;
    conditionsDesc.style.display = `none`;

};

function reqWeather() {

    const userInput = document.getElementById(`cityInput`).value.replace(/\s{2,}/g, ` `);
    let nums = /[0-9]/g,
        aplha = /[A-z]/g,
        query;


    if (userInput.length < 3 || userInput.length > 60) { // runs if isnt a valid length

        alert(`Not a valid U.S. City or Zipcode, please try again!\n*Search must be between 3-60 characters*`);
        return

    } else if (nums.test(userInput) && aplha.test(userInput)) { // runs if input contains a mix of numbers and letters

        alert(`There cannot be numbers and letters in your search`);
        return

    } else if (!aplha.test(userInput) && userInput.match(nums).length === 5) { // valid zipcode

        query = `&zip=${userInput}`;

    } else if (aplha.test(userInput)) { // valid string

        query = `&q=${userInput}`;

    } else { // only can be invalid zipcode

        alert(`The numbers you have entered are not a valid zipcode`);
        return

    }

    const xhr = new XMLHttpRequest(),
        apiKey = `ADD API KEY`,
        endpoint = `http://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial${query}`;

    xhr.open('GET', endpoint);

    xhr.onload = () => {

        const weatherData = JSON.parse(xhr.responseText);

        if (weatherData.cod != 200) {

            alert(`The location you are searching for cannot be found, please try again`);
            document.body.innerHTML = ``;
            initialElms();
            return

        }

        displayData(weatherData);

    };

    xhr.send();

};

function displayData(data) {

    document.getElementById(`location`).innerText = `${data.name}`;
    document.getElementById(`humidity`).innerText = `Humidity: ${Math.round(data.main.humidity)}%`;
    document.getElementById(`feelsLike`).innerText = `Feels Like: ${Math.round(data.main.feels_like)}°F`;
    document.getElementById(`curTenp`).innerText = `Current Temperature: ${Math.round(data.main.temp)}°F`;
    document.getElementById(`maxT`).innerText = `High: ${Math.round(data.main.temp_max)}°F`;
    document.getElementById(`minT`).innerText = `Low: ${Math.round(data.main.temp_min)}°F`;
    document.getElementById(`conditionsImg`).src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById(`conditionsImg`).style.display = `initial`;
    document.getElementById(`conditionsDesc`).innerText = `${data.weather[0].description.toUpperCase()}`;
    document.getElementById(`conditionsDesc`).style.display = `initial`;
    if (Number(data.weather[0].icon.substr(0, 2) < 10)) {
        document.getElementById(`weatherInfo`).style.backgroundImage = `url(${condtionImgs[data.weather[0].icon.substr(1, 1)]})`;
    } else {
        document.getElementById(`weatherInfo`).style.backgroundImage = `url(${condtionImgs[data.weather[0].icon.substr(0, 2)]})`;
    }

};

function createDiv(divObj) { // id, class

    let div = document.createElement(`div`);

    div.id = divObj.id != undefined && document.getElementById(divObj.id) == null ? divObj.id : `>> No ID <<`;

    div.className = divObj.class != undefined ? divObj.class : ``;

    return div

};

function createHeading(headingObj) { // size, text, id, class

    let heading = headingObj.size >= 1 && headingObj.size <= 5 ? document.createElement(`h` + headingObj.size) : document.createElement(`h5`);

    heading.innerHTML = typeof headingObj.text == `string` ? headingObj.text : `>> No text <<`;

    heading.id = headingObj.id != undefined && document.getElementById(headingObj.id) == null ? headingObj.id : `>> No ID <<`;

    heading.className = headingObj.class != undefined ? headingObj.class : ``;

    return heading

};

function createParagraph(paraObj) { // text, class, id

    let paragraph = document.createElement(`p`);

    paragraph.innerHTML = paraObj.text != undefined ? paraObj.text : `>> No Text <<`;

    paragraph.className = paraObj.class != undefined ? paraObj.class : ``;

    paragraph.id = paraObj.id != undefined && document.getElementById(paraObj.id) == null ? paraObj.id : ``;

    return paragraph

};

function createImage(imageObj) { // src, alt, id, class

    let image = document.createElement(`img`);

    image.src = imageObj.src != undefined ? imageObj.src : ``;

    image.alt = imageObj.alt != undefined ? imageObj.alt : `image couldn't load; broke`;

    image.id = imageObj.id != undefined && document.getElementById(imageObj.id) == null ? imageObj.id : `>> No ID <<`;

    image.className = imageObj.class != undefined ? imageObj.class : ``;

    return image

};

function createButton(buttonObj) { // id, class, text, onClickFunc

    let button = document.createElement(`button`);

    button.id = buttonObj.id != undefined && document.getElementById(buttonObj.id) == null ? buttonObj.id : `>> No ID <<`;

    button.className = buttonObj.class != undefined ? buttonObj.class : ``;

    button.innerHTML = typeof buttonObj.text == `string` ? buttonObj.text : `>> No Text <<`;

    button.onclick = buttonObj.onClickFunc != undefined && typeof buttonObj.onClickFunc == `function` ? buttonObj.onClickFunc : `>> No function <<`;

    return button

};

function createHREF(hrefObj) { // id, newTab (true or false), ref, display (wether text, image, ect.)

    let href = document.createElement(`a`);

    href.id = hrefObj.id != undefined && document.getElementById(hrefObj.id) == null ? hrefObj.id : `>> No ID <<`;

    href.target = hrefObj.newTab === true ? href.target = `_blank` : ``;

    href.href = hrefObj.ref != undefined ? hrefObj.ref : `>> No Referenece <<`;

    href.innerHTML = hrefObj.display != undefined ? hrefObj.display : `>> No Display <<`;

    return href
};

function createSelect(selectObj) { // id, class, defOp, defOpID, data (used to create the options), onChangeFunc

    let select = document.createElement(`select`);

    select.id = selectObj.id != undefined && document.getElementById(selectObj.id) == null ? selectObj.id : `>> No ID <<`;

    select.className = selectObj.class != undefined ? selectObj.class : ``;

    let defaultOp = document.createElement(`option`);

    defaultOp.innerHTML = selectObj.defOp != undefined ? selectObj.defOp : `Select an Option`;

    defaultOp.id = selectObj.defOpID != undefined && document.getElementById(selectObj.defOpID) == null ? selectObj.defOpID : `>> No ID <<`;

    defaultOp.value = ``;

    select.appendChild(defaultOp);

    for (let a = 0; a < selectObj.data.length; a++) {

        let option = document.createElement(`option`);

        option.id = selectObj.data[a];

        option.innerHTML = selectObj.data[a];

        option.value = selectObj.data[a];

        select.appendChild(option);

    }

    select.onchange = selectObj.onChangeFunc != undefined ? selectObj.onChangeFunc : ``;

    return select

};

function createInput(inputObj) { // id, class, sCheck, pHolder

    let input = document.createElement(`input`);

    input.id = inputObj.id != undefined && document.getElementById(inputObj.id) == null ? inputObj.id : `>> No ID <<`;

    input.spellcheck = inputObj.sCheck != undefined ? inputObj.sCheck : true;

    input.placeholder = inputObj.pHolder != undefined ? inputObj.pHolder : ``;

    input.className = inputObj.class != undefined ? inputObj.class : ``;

    return input

};