// GLOBAL VARIBALES
let dateRN = new Date(),
    dateInfo = {

        year: dateRN.getFullYear(),
        month: dateRN.getMonth(),
        monthsArr: [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`],
        daysByMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        day: dateRN.getDate(),
        dayLimit: 7,

        // VARIABLE FOR STORING THE `DATE AND DATE NOTE` AS KEY/VALUE PAIR
        storedData: {}

    },
    currentDate = `${dateRN.getDate()}${dateRN.getMonth()}${dateRN.getFullYear()}`,
    dates = [currentDate],
    oldestDate = findDay7(),
    apiKey = `ADD API KEY`;

// VARIABLES FOR SELECT ELEMENT CHANGES
let storedYear = dateRN.getFullYear(),
    storedMonth = dateRN.getMonth(),
    storedDay = dateRN.getDate();


// FUNCTIONS NEEDED
// WINDOW ONLOAD
// XHRs FOR BOTH APIs APOD AND MARS WEATHER

window.onload = () => {

    intialElements();
    getAPOD();
    getWeather();

}

// WINDOW ONLOAD FUNCTIONS
function intialElements() {

    // CREATE DATE HEADING ELEMENT
    let dateDisplay = createHeading({ id: `dateHead`, text: `${dateInfo.monthsArr[dateInfo.month]} ${dateInfo.day}, ${dateInfo.year}`, size: 1 });

    // CREATE DIVS
    let mainDiv = createDiv({ id: `mainDiv` }),
        interactive = createDiv({ id: `interactive` }),
        weatherDiv = createDiv({ id: `weatherDiv` }),
        weatherDisplay = createDiv({ id: `weatherDisplay` });

    // CREATE BUTTONS
    let changeBG = createButton({ id: `changeBGButton`, text: `Pick A Date For New Background`, class: `buttons`, onClickFunc: changeBGFunc }),
        showMars = createButton({ id: `showMarsButton`, text: `Show Mars Weather`, class: `buttons`, onClickFunc: showMarsFunc }),
        hideMars = createButton({ id: `hideMarsButton`, text: `Hide Mars Weather`, class: `buttons`, onClickFunc: hideMarsFunc });

    // CREATE YEAR AND MONTHS SELECTS
    // CREATE A LOOP TO GET `YEAR` SELECT DATA
    let startYear = 2000,
        endYear = 2020,
        yearsArr = [];

    while (startYear <= endYear) {
        yearsArr.unshift(startYear);
        startYear++;
    }

    let nextDay = createButton({ id: `nextDay`, class: `dateBtns`, text: `Day >`, onClickFunc: modifyDate }),
        prevDay = createButton({ id: `prevDay`, class: `dateBtns`, text: `< Day`, onClickFunc: modifyDate }),
        cancel = createButton({ id: `cancelButton`, text: `X`, onClickFunc: cancelMethod }),
        yearSelect = createSelect({ id: `yearSelect`, class: `calSelects`, defOp: `Select Year`, data: yearsArr, onchange: selectYear }),
        monthSelect = createSelect({ id: `monthSelect`, class: `calSelects`, defOp: `Select Month`, data: dateInfo.monthsArr, onchange: selectMonth });

    document.body.appendChild(mainDiv);
    mainDiv.appendChild(dateDisplay);
    mainDiv.appendChild(interactive);
    mainDiv.appendChild(weatherDiv);
    weatherDiv.appendChild(weatherDisplay);
    interactive.appendChild(prevDay);
    interactive.appendChild(changeBG);
    interactive.appendChild(yearSelect);
    interactive.appendChild(monthSelect);
    interactive.appendChild(cancel);
    interactive.appendChild(showMars);
    interactive.appendChild(hideMars);
    interactive.appendChild(nextDay);
    mainDiv.style.height = `105px`;
    weatherDisplay.style.opacity = `0`;
    cancel.style.display = `none`;
    yearSelect.style.display = `none`;
    monthSelect.style.display = `none`;
    hideMars.style.display = `none`;

}

function getAPOD() {

    let month = ``,
        day = ``;
    if (dateInfo.month < 10) {
        month = `0${dateInfo.month}`;
    } else {
        month = dateInfo.month;
    }

    if (dateInfo.day < 10) {
        day = `0${dateInfo.day}`;
    } else {
        day = dateInfo.day;
    }

    let xhr = new XMLHttpRequest(),
        endpoint = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${dateInfo.year}-${month}-${day}`;

    xhr.open('GET', endpoint, true);

    xhr.onload = () => {

        let data = JSON.parse(xhr.responseText);

        if (data.media_type == `video`) {

            // ADDED DEAFULT IMAGE INCASE THE NASA LINK IS A VIDEO
            document.body.style.backgroundImage = `url(atmosphere.jpg)`;

        } else {

            document.body.style.backgroundImage = `url(${data.hdurl})`;

        }

    }

    xhr.send();

}

function getWeather() {

    let date = `${dateInfo.day}${dateInfo.month}${dateInfo.year}`,
        idx = dates.indexOf(date);

    let xhr = new XMLHttpRequest(),
        endpoint = `https://api.nasa.gov/insight_weather/?api_key=${apiKey}&feedtype=json&ver=1.0`;

    xhr.open('GET', endpoint, true);

    xhr.onload = () => {

        let data = JSON.parse(xhr.responseText),
            solKey = data.sol_keys[idx],
            solData = data[solKey],
            solHeading = createHeading({ text: `Sol ${solKey}`, id: `solHeading` }),
            solHigh = createHeading({ text: `High: ${Math.round(solData.AT.mx)}°C/${Math.round((solData.AT.mx * 9 / 5) + 32)}°F`, id: `solHigh` }),
            solLow = createHeading({ text: `Low: ${Math.round(solData.AT.mn)}°C/ ${Math.round((solData.AT.mn * 9 / 5) + 32)}°F`, id: `solLow` });

        document.getElementById(`weatherDisplay`).appendChild(solHeading);
        document.getElementById(`weatherDisplay`).appendChild(solHigh);
        document.getElementById(`weatherDisplay`).appendChild(solLow);

    }

    xhr.send();

}

// FUNCTION TO FIND THE 7TH DAY PRIOR TO TODAY
function findDay7() {

    let currentDay = dateInfo.day,
        currentMonth = dateInfo.month,
        currentYear = dateInfo.year,
        dayNum = currentDay,
        monthNum = currentMonth,
        yearNum = currentYear,
        a = 1;

    checkLeapYear(yearNum);

    while (a < dateInfo.dayLimit) {

        if (dayNum > 1) {
            dayNum--;
        } else if (dayNum == 1 && monthNum != 0) { // at beginning of the month, but not the end of the year)

            dayNum = dateInfo.daysByMonth[monthNum];
            monthNum--;

        } else if (dayNum == 1 && monthNum == 0) { // at beginning of the month of december/ end of year

            dayNum = 31;
            monthNum = 12;
            yearNum--;

        }

        dates.unshift(`${dayNum}${monthNum}${yearNum}`);
        a++;

    }

    return `${dayNum}${monthNum}${yearNum}`

}

// FUNCTIONS FOR NEXT AND PREVIOUS DAY BUTTONS
function modifyDate() {

    let id = this.id,
        curDay = dateInfo.day,
        curMonth = dateInfo.month,
        curYear = dateInfo.year;

    checkLeapYear(curYear);

    // preform a change on dateInfo based on the button pressed
    // creating functions for each specific case
    switch (id) {
        case `nextDay`:

            nextDay(curDay, curMonth, curYear);
            document.getElementById(`weatherDisplay`).innerHTML = ``;
            getWeather();

            break;

        case `prevDay`:
            prevDay(curDay, curMonth, curYear);
            document.getElementById(`weatherDisplay`).innerHTML = ``;
            getWeather();

            break;

    }

    // UPDATE THE FRONT-END
    updateFront();

}

function nextDay(curDay, curMonth, curYear) {
    // check for:
    //? what month are we in? 
    //? what is the last day of the month? 
    //? are we on the last day of the month? if so, continue on to the next month
    //? is it december? b/c then we have to continue into the next year
    //? if not on last day then continue increasing through the month

    if (`${curDay}${curMonth}${curYear}` == currentDate) {

        return

    } else {

        // need to minus 1 to account for the index of the months not starting at 1 but instead starting at 0; Jan = 0 not 1
        if (curDay - 1 < dateInfo.day) {

            dateInfo.day++;

        } else if (curDay == dateInfo.daysByMonth[curMonth] && curMonth != 11) { // at end of the month, but not the end of the year)

            dateInfo.day = 1;
            dateInfo.month++;

        } else if (curDay == dateInfo.daysByMonth[curMonth] && curMonth == 11) { // at end of the month of december/ end of year

            dateInfo.day = 1;
            dateInfo.month = 1;
            dateInfo.year++;

        } else { console.log(`Something went wrong, check code`); }

    }

    getAPOD();

}

function prevDay(curDay, curMonth, curYear) {
    // check for:
    //? what month are we in?
    //? are we on the first day of the month? if so, continue on to the next month
    //? is it january? b/c then we have to continue into the previous year
    //? if not on last day then continue decreasing through the month

    if (`${curDay}${curMonth}${curYear}` == oldestDate) {

        return

    } else {

        if (curDay > 1) {

            dateInfo.day--;

        } else if (curDay == 1 && curMonth != 0) { // at beginning of the month, but not the end of the year)

            dateInfo.day = dateInfo.daysByMonth[curMonth - 1];
            dateInfo.month--;

        } else if (curDay == 1 && curMonth == 0) { // at beginning of the month of december/ end of year

            dateInfo.day = 31;
            dateInfo.month = 12;
            dateInfo.year--;

        } else { console.log(`Something went wrong, check code`); }

    }

    getAPOD();

}

function updateFront() {
    let oldDate = document.getElementById(`dateHead`),
        parentDiv = oldDate.parentNode,
        newDate = createHeading({ text: `${dateInfo.monthsArr[dateInfo.month]} ${dateInfo.day}, ${dateInfo.year}`, size: 1 });
    parentDiv.replaceChild(newDate, oldDate);
    newDate.id = `dateHead`;
}

// FUNCTIONS FOR CHANGING BACKGROUND VIA DATE SELECTION
function changeBGFunc() {

    document.getElementById(`changeBGButton`).style.display = `none`;
    document.getElementById(`showMarsButton`).style.display = `none`;
    document.getElementById(`hideMarsButton`).style.display = `none`;
    document.getElementById(`nextDay`).style.display = `none`;
    document.getElementById(`prevDay`).style.display = `none`;
    document.getElementById(`cancelButton`).style.display = `initial`;
    document.getElementById(`yearSelect`).style.display = `initial`;
    document.getElementById(`yearSelect`).value = ``;

}

function cancelMethod() {

    document.getElementById(`changeBGButton`).style.display = `initial`;
    if (document.getElementById(`mainDiv`).style.height == `155px`) { document.getElementById(`hideMarsButton`).style.display = `initial`; } else {

        document.getElementById(`showMarsButton`).style.display = `initial`;
        document.getElementById(`weatherDisplay`).style.opacity = `0`;

    }

    document.getElementById(`nextDay`).style.display = `initial`;
    document.getElementById(`prevDay`).style.display = `initial`;
    document.getElementById(`cancelButton`).style.display = `none`;
    document.getElementById(`yearSelect`).style.display = `none`;
    document.getElementById(`monthSelect`).style.display = `none`;
    if (document.getElementById(`daySelect`) != null) { document.getElementById(`daySelect`).style.display = `none`; }

    if (dateInfo.year != storedYear) { dateInfo.year = storedYear; }

    if (dateInfo.month != storedMonth) { dateInfo.month = storedMonth; }

    if (dateInfo.day != storedDay) { dateInfo.day = storedDay; }

}

/* FUNCTIONS FOR SELECTS:
    [*]CHECK FOR LEAP YEAR
    [*]MONTH, [*]DAY, [*]YEAR
        MAKE FUNCTIONS FOR REPEATED CODE (IF ANY)
*/

function checkLeapYear(year) {

    if (year % 4 == 0 || (year % 100 != 0 && year % 400 == 0)) {

        dateInfo.daysByMonth[1] = 29;

    } else {

        dateInfo.daysByMonth[1] = 28;

    }

}

function selectYear() {

    dateInfo.year = this.value;

    if (dateInfo.year == ``) {
        return
    } else {

        checkLeapYear(dateInfo.year);

        this.style.display = `none`;
        document.getElementById(`monthSelect`).style.display = `initial`;
        document.getElementById(`monthSelect`).value = ``;

    }

}

function selectMonth() {

    dateInfo.month = dateInfo.monthsArr.indexOf(this.value);

    if (this.value == ``) {
        return
    } else {

        this.style.display = `none`;

        // CREATE A LOOP TO GET `DAYS` DATA
        let daysArr = [],
            startDay = 1,
            endDay = dateInfo.daysByMonth[dateInfo.month];
        while (startDay <= endDay) {
            daysArr.push(startDay);
            startDay++;
        }

        // CREATE DAY SELECT ELEMENT
        let daySelect = ``;

        if (document.getElementById(`daySelect`) != null) {
            let oldSelect = document.getElementById(`daySelect`),
                parentDiv = oldSelect.parentNode;
            daySelect = createSelect({ class: `calSelects`, defOp: `Select Day`, data: daysArr, onchange: selectDay });
            parentDiv.replaceChild(daySelect, oldSelect);
            daySelect.id = `daySelect`;
        } else {

            daySelect = createSelect({ id: `daySelect`, class: `calSelects`, defOp: `Select Day`, data: daysArr, onchange: selectDay });

        }

        document.getElementById(`interactive`).appendChild(daySelect);
        document.getElementById(`interactive`).insertBefore(daySelect, document.getElementById(`cancelButton`));

    }

}

function selectDay() {

    dateInfo.day = this.value;

    if (this.value == ``) {
        return
    } else {

        this.style.display = `none`;

        document.getElementById(`nextDay`).style.display = `initial`;
        document.getElementById(`prevDay`).style.display = `initial`;
        document.getElementById(`cancelButton`).style.display = `none`;
        document.getElementById(`changeBGButton`).style.display = `initial`;
        document.getElementById(`showMarsButton`).style.display = `initial`;

    }

    getAPOD();
    dateInfo.day = storedDay;
    dateInfo.month = storedMonth;
    dateInfo.year = storedYear;

}

// FUNCTIONS FOR SHOWING MARS WEATHER DETAILS
function showMarsFunc() {

    document.getElementById(`showMarsButton`).style.display = `none`;
    document.getElementById(`hideMarsButton`).style.display = `initial`;
    document.getElementById(`mainDiv`).style.height = `155px`;
    document.getElementById(`mainDiv`).style.transition = `0.5s`;
    document.getElementById(`weatherDisplay`).style.transition = `opacity 0.5s`;
    document.getElementById(`weatherDisplay`).style.opacity = `1`;
    document.getElementById(`weatherDisplay`).style.transitionDelay = `0.25s`;

}

function hideMarsFunc() {

    document.getElementById(`showMarsButton`).style.display = `initial`;
    document.getElementById(`hideMarsButton`).style.display = `none`;
    document.getElementById(`mainDiv`).style.height = `105px`;
    document.getElementById(`mainDiv`).style.transition = `0.5s`;
    document.getElementById(`weatherDisplay`).style.transition = `opacity 0.1s`;
    document.getElementById(`weatherDisplay`).style.opacity = `0`;

}

// FUNCTIONS TO CREATE HTML ELEMENTS
function createDiv(divObj) {

    // id, class

    let div = document.createElement(`div`);

    div.id = divObj.id != undefined && document.getElementById(divObj.id) == null ? divObj.id : `>> No ID <<`;

    div.className = divObj.class != undefined ? divObj.class : ``;

    return div

};

function createHeading(headingObj) {

    // size, text, id

    let heading = headingObj.size >= 1 && headingObj.size <= 5 ? document.createElement('h' + headingObj.size) : document.createElement('h5');

    heading.innerText = (typeof headingObj.text == 'string') ? headingObj.text : 'no text';

    if (headingObj.id != undefined && document.getElementById(headingObj.id) == null) {

        heading.id = headingObj.id

    }

    heading.className = headingObj.class != undefined ? headingObj.class : ``;

    return heading

}

function createParagraph(paraObj) {

    // text

    let paragraph = document.createElement(`p`);

    paragraph.innerHTML = paraObj.text != undefined ? paraObj.text : `>> No Text <<`;

    return paragraph

}

function createButton(buttonObj) {

    // id, text, class, onClickFunc

    let button = document.createElement('button');

    if (buttonObj.id != undefined && document.getElementById(buttonObj.id) == null) {

        button.id = buttonObj.id

    }

    if (buttonObj.class != undefined) {

        button.className = buttonObj.class

    }

    if (buttonObj.onClickFunc != undefined) {

        button.onclick = buttonObj.onClickFunc;

    }

    if (buttonObj.text != undefined) {

        button.innerText = buttonObj.text

    }

    return button

}

function createSelect(selectObj) {

    // id, class, defOp, defOpID, data (used to create the options)

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

    select.onchange = selectObj.onchange != undefined ? selectObj.onchange : ``;

    return select

};