let dateSelected = {
        year: 0,
        month: 0,
        day: 0
    },
    currentYear = new Date().getFullYear(),
    currentMonth = new Date().getMonth(),
    currentDay = new Date().getDate(),
    daysByMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    body = document.body,
    apiKey = `TXi5A7X2oAnW0kxjVcgqchorBJxAOkUdgo8Xtetp`;

window.onload = () => {

    // [*]make the first NASA request to get todays' picture
    // [*]create divs
    // [*]1 holds buttons and selects
    // [*]1 holds img explanation
    // [*]have img become webpage background
    // [*]make the button element
    // [*]make the year select element

    let interactive = createDiv({ id: `interactive` }),
        descDiv = createDiv({ id: `imgDesc` });

    let startBtn = createButton({
        text: `Begin Selection`,
        id: `startBtn`,
        onClickFunc: startSequence
    });

    let yearNum = currentYear,
        yearArr = [];

    while (yearNum > 1994) {

        yearArr.push(yearNum);
        yearNum--;

    }

    let yearSel = createSelect({
        data: yearArr,
        id: `yearSel`,
        defOp: `Select A Year`,
        onChangeFunc: yearSelectFunc
    });

    body.appendChild(descDiv);
    body.appendChild(interactive);
    interactive.appendChild(startBtn);
    interactive.appendChild(yearSel);
    yearSel.style.display = `none`;

    getAPOD();

}

// API FUNCTION
function getAPOD() {

    let date = ``;

    if (dateSelected.year == 0) {

        let month = currentMonth + 1 < 10 ? `0${currentMonth + 1}` : currentMonth + 1,
            day = currentDay < 10 ? `0${currentDay}` : currentDay;
        date = `${currentYear}-${month}-${day}`;

    } else {
        console.log(dateSelected.year);

        let month = dateSelected.month < 10 ? `0${dateSelected.month}` : dateSelected.month,
            day = dateSelected.day < 10 ? `0${dateSelected.day}` : dateSelected.day;
        date = `${dateSelected.year}-${month}-${day}`;

    }

    let xhr = new XMLHttpRequest(),
        endpoint = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}&hd=true`;

    xhr.open('GET', endpoint);

    xhr.onload = () => {

        let res = JSON.parse(xhr.responseText);
        displayAPOD(res);

    };

    xhr.send();

}

function displayAPOD(data) {

    if (data.code != undefined) {

        alert(`Error Code: ${data.code}\nError Message: ${data.msg}`);

    } else {

        if (data.media_type == `video`) {

            alert(`The media type was a video.\nA link to the video: "${data.url}"\nPlease copy and paste to your broswer search bar`);

        } else {

            let imgDiv = document.getElementById(`imgDesc`);

            if (imgDiv.innerHTML != ``) {

                imgDiv.innerHTML = ``;

            }

            body.style.backgroundImage = `url(${data.hdurl})`;

            let imgDate = createHeading({ text: data.date, id: `imgDate` }),
                imgTitle = createHeading({ text: data.title, id: `imgTitle` }),
                explDiv = createDiv({ id: `explDiv` }),
                imgExpl = createParagraph({ text: data.explanation, id: `imgExpl` });

            imgDiv.appendChild(imgTitle);
            imgDiv.appendChild(imgDate);
            imgDiv.appendChild(explDiv);
            explDiv.appendChild(imgExpl);

        }

    }

};

// FUNCTIONS FOR FUNCTIONALLITY
// START BUTTON
// SELECTS: YEAR, MONTH, DAY
function startSequence() {

    this.style.display = `none`;
    document.getElementById(`yearSel`).style.display = `initial`;

};

function yearSelectFunc() {

    // extract year selected
    // set the year property of the date object
    // hide the year select
    // create the month select

    let year = this.value;
    dateSelected.year = year;
    this.style.display = `none`;

    let monthsArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    if (year == `1995`) {

        monthsArr.splice(0, 5);

    } else if (year == currentYear) {

        monthsArr.splice(currentMonth + 1, 12);

    }

    let monthSel = createSelect({
        id: `monthSel`,
        defOp: `Select A Month`,
        onChangeFunc: monthSelectFunc,
        data: monthsArr
    });
    document.getElementById(`interactive`).appendChild(monthSel);

};

function monthSelectFunc() {

    // extract month selected
    // set the month property of the date object
    // hide the month select
    // create the day select

    let month = this.value;
    dateSelected.month = month;
    this.style.display = `none`;

    checkLeapYear(dateSelected.year);

    let days = daysByMonth[month - 1],
        daysArr = [];

    while (days >= 1) {

        daysArr.unshift(days);
        days--;

    };

    if (dateSelected.year == 1995 && month == 6) {

        daysArr.splice(0, 15);

    } else if (dateSelected.year == currentYear && dateSelected.month == currentMonth + 1) {

        daysArr.splice(currentDay, daysArr.length);

    }

    let daySel = createSelect({
        id: `daySel`,
        defOp: `Select A Day`,
        onChangeFunc: daySelectFunc,
        data: daysArr
    });
    document.getElementById(`interactive`).appendChild(daySel);

};

function daySelectFunc() {

    this.style.display = `none`;
    let day = this.value;
    dateSelected.day = day;
    document.getElementById(`startBtn`).style.display = `initial`;
    document.getElementById(`yearSel`).value = ``;


    getAPOD();

};

function checkLeapYear(year) {

    if (year % 4 == 0 || (year % 100 != 0 && year % 400 == 0)) {

        daysByMonth[1] = 29;

    } else {

        daysByMonth[1] = 28;

    }

}

// FUNCTIONS FOR CREATING HTML ELEMENTS
function createDiv(divObj) { // id, class

    let div = document.createElement(`div`);

    div.id = divObj.id != undefined && document.getElementById(divObj.id) == null ? divObj.id : `>> No ID <<`;

    div.className = divObj.class != undefined ? divObj.class : ``;

    return div

};

function createHeading(headingObj) { // size, text, id

    let heading = headingObj.size >= 1 && headingObj.size <= 5 ? document.createElement(`h` + headingObj.size) : document.createElement(`h5`);

    heading.innerHTML = typeof headingObj.text == `string` ? headingObj.text : `>> No text <<`;

    heading.id = headingObj.id != undefined && document.getElementById(headingObj.id) == null ? headingObj.id : `>> No ID <<`;

    return heading

};

function createImage(imageObj) { // src, alt, id, class

    let image = document.createElement(`img`);

    image.src = imageObj.src != undefined ? imageObj.src : `images/default.jpg`;

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

    defaultOp.id = selectObj.defOpID != undefined && document.getElementById(selectObj.defOpID) == null ? selectObj.defOpID : ``;

    defaultOp.value = ``;

    select.appendChild(defaultOp);

    for (let a = 0; a < selectObj.data.length; a++) {

        let option = document.createElement(`option`);

        option.id = `${selectObj.data[a]}ID`;

        option.innerHTML = selectObj.data[a];

        option.value = selectObj.data[a];

        select.appendChild(option);

    }

    select.onchange = selectObj.onChangeFunc != undefined ? selectObj.onChangeFunc : ``;

    return select

};

function createParagraph(paraObj) { // text, class, id

    let paragraph = document.createElement(`p`);

    paragraph.innerHTML = paraObj.text != undefined ? paraObj.text : `>> No Text <<`;

    paragraph.className = paraObj.class != undefined ? paraObj.class : ``;

    paragraph.id = paraObj.id != undefined && document.getElementById(paraObj.id) == null ? paraObj.id : ``;

    return paragraph

}