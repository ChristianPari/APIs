let userProvidedDate = false,
    daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    monthNames = [`January`, `Feburary`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `Novemeber`, `December`];

let dateInfo = {

    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),

};

function yearSelected() {

    //extract the year that was selected
    let year = this.value;

    //set the year property of the new date object
    dateInfo.year = year;

    if (document.getElementById(`defaultYear`) != null) { document.getElementById(`defaultYear`).remove(); };

    //create the month select 
    let monthsArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    if (year == new Date().getFullYear()) {

        let currMonth = new Date().getMonth() + 1;

        monthsArr.splice(currMonth, 12);

    }

    if (year % 4 == 0 || (year % 100 != 0 && year % 400 == 0)) { daysInMonth[1] = 29; }

    let monthSelect = document.getElementById(`monthSelect`),
        newMonth = document.createElement(`select`);

    monthSelect.parentNode.replaceChild(newMonth, monthSelect);

    newMonth.id = `monthSelect`;

    let defaultOp = document.createElement(`option`);

    defaultOp.innerHTML = `Select a Month`;

    defaultOp.id = `defaultMonth`;

    newMonth.appendChild(defaultOp);

    for (let a = 1; a < monthsArr.length + 1; a++) {

        let option = document.createElement(`option`);

        option.id = monthNames[a - 1];

        option.innerHTML = monthNames[a - 1];

        option.value = [a];

        newMonth.appendChild(option);

    }

    newMonth.onchange = monthSelected;

};

function monthSelected() {

    let month = this.value; //extract value from select

    dateInfo.month = month; //set dateinfo prop accordingly

    if (document.getElementById(`defaultMonth`) != null) { document.getElementById(`defaultMonth`).remove(); }

    let daysArr = Array.from({ length: daysInMonth[month - 1] }, (a, b) => b + 1).slice();

    if (dateInfo.year == new Date().getFullYear() && month == new Date().getMonth() + 1) {

        daysArr.splice(new Date().getDate(), daysArr.length - 1);

    }

    let daySelect = document.getElementById(`daySelect`),
        newDay = document.createElement(`select`);

    daySelect.parentNode.replaceChild(newDay, daySelect);

    newDay.id = `daySelect`;

    let defaultOp = document.createElement(`option`);

    defaultOp.innerHTML = `Select a Day`;

    defaultOp.id = `defaultDay`;

    newDay.appendChild(defaultOp);

    for (let a = 0; a < daysArr.length; a++) {

        let option = document.createElement(`option`);

        option.innerHTML = daysArr[a];

        option.value = daysArr[a];

        newDay.appendChild(option);

    }

    newDay.onchange = daySelected;

};

function daySelected() {

    if (document.getElementById(`defaultDay`) != null) { document.getElementById(`defaultDay`).remove(); }

    userProvidedDate = true;

    // testUserSubmit();

    let day = this.value;

    dateInfo.day = day;

};