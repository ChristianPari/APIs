let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
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

    //hide the year select
    this.style.display = 'none';

    //create the month select 
    let monthsArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    if (year == new Date().getFullYear()) {

        let currMonth = new Date().getMonth() + 1;

        monthsArr.splice(currMonth, 12);



    }

    if (document.getElementById('monthSelect') != null) {

        let child = document.getElementById('monthSelect').remove()

    }

    let monthSelect = createSelect({
        defOp: 'Select A Month',
        id: 'monthSelect',
        onChangeFunc: monthSelected,
        data: monthsArr

    });

    document.getElementById(`uiDiv`).appendChild(monthSelect);

};

function monthSelected() {


    let month = this.value; //extract value from select

    dateInfo.month = month; //set dateinfo prop accordingly

    this.style.display = 'none';

    //create the day select elm

    let daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let daysArr = [];

    let count = 1;
    let days = []

    for (let i = 1; i <= daysInMonths[month - 1]; i++) {

        daysArr.push(i)

    }

    if (dateInfo.year == 1995 && month == 6) {

        daysArr.splice(0, 15)

    } else if (dateInfo.year == new Date().getFullYear() && month == new Date().getMonth() + 1) {

        console.log(new Date().getDate(), daysArr.length - 1);

        daysArr.splice(new Date().getDate(), daysArr.length - 1);


    }


    if (document.getElementById('daySelect') != null) {

        let child = document.getElementById('daySelect').remove()

    }

    let daySelect = createSelect({
        defOp: 'Select A Day',
        id: 'daySelect',
        onChangeFunc: daySelected,
        data: daysArr
    })

    //append the select element to the dom

    document.getElementById(`uiDiv`).appendChild(daySelect);

};

function daySelected() {

    this.style.display = 'none';

    let day = this.value;

    dateInfo.day = day;

    document.getElementById('yearSelect').value = '';
    document.getElementById('yearSelect').style.display = 'initial';

    console.log(`${dateInfo.year}-${dateInfo.month}-${dateInfo.day}`);

    document.getElementById(`dateHead`).innerText = `You Have Selected\n${monthNames[dateInfo.month - 1]} ${dateInfo.day}, ${dateInfo.year}`;

};