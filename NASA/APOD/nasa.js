let dateInfo = {
        year: 0,
        month: 0,
        day: 0
    },
    body = document.body,
    apiKey = `TXi5A7X2oAnW0kxjVcgqchorBJxAOkUdgo8Xtetp`;

window.onload = () => {

    // []make the first NASA request to get todays' picture
    // [*]make the button element
    // [*]make the year select element

    let startBtn = createButton({
        text: `Begin Selection`,
        id: `startBtn`,
        onClickFunc: startSequence
    });
    body.appendChild(startBtn);

    let yearNum = 2020,
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
    body.appendChild(yearSel);
    yearSel.style.display = `none`;

}

// API FUNCTION
function getAPOD() {

    const month = dateInfo.month < 10 ? `0${dateInfo.month}` : dateInfo.month,
        day = dateInfo.day < 10 ? `0${dateInfo.day}` : dateInfo.day,
        date = `${dateInfo.year}-${month}-${day}`;

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
    dateInfo.year = year;
    this.style.display = `none`;

    let monthsArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        monthSel = createSelect({
            id: `monthSel`,
            defOp: `Select A Month`,
            onChangeFunc: monthSelectFunc,
            data: monthsArr
        });
    body.appendChild(monthSel);

};

function monthSelectFunc() {

    // extract month selected
    // set the month property of the date object
    // hide the month select
    // create the day select

    let month = this.value;
    dateInfo.month = month;
    this.style.display = `none`;

    let daysByMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        days = daysByMonth[month - 1],
        daysArr = [];

    while (days >= 1) {

        daysArr.unshift(days);
        days--;

    };

    let daySel = createSelect({
        id: `daySel`,
        defOp: `Select A Day`,
        onChangeFunc: daySelectFunc,
        data: daysArr
    });
    body.appendChild(daySel);

};

function daySelectFunc() {

    this.style.display = `none`;
    let day = this.value;
    dateInfo.day = day;
    document.getElementById(`startBtn`).style.display = `initial`;
    document.getElementById(`yearSel`).value = ``;

    getAPOD();

};

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