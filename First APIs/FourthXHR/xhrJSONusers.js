window.onload = () => {

    let header = createHeading({ id: `mainHead`, text: `Company Resource Site`, size: 1 }),
        mainDiv = createDiv({ id: `mainDiv` }),
        companysDiv = createDiv({ id: `companysDiv` }),
        sidebar = createDiv({ id: `sidebar` });
    document.body.appendChild(header);
    document.body.appendChild(mainDiv);
    mainDiv.appendChild(companysDiv);
    mainDiv.appendChild(sidebar);

    // maybe implement a sidebar that holds 'interested in' companies after a button is clicked on the user div
    createSidebar();

    requestAllUsers();

}

function requestAllUsers() {

    // setup xhr 
    let xhr = new XMLHttpRequest(),
        reqMeth = 'GET',
        ep = `https://jsonplaceholder.typicode.com/users`,
        async = true;

    xhr.open(reqMeth, ep, async); // initialize api request/open channel

    xhr.onload = () => { // handle the api reponse

        // raw response
        // parse raw
        // iterate through the data to get each users info

        let rawRes = xhr.responseText,
            parsedRes = JSON.parse(rawRes);

        console.log(parsedRes); // to see what key/value pairs im working with

        for (let a = 0; a < parsedRes.length; a++) {

            let userData = parsedRes[a]; // created a variable to store each users data in

            displayUser(userData); // function to handle the users data

        }

    }

    xhr.send(); // if we need to; this will pass information with the request, in the form of a JSON object

}

function displayUser(user) {

    // div for each user
    // heading that'll display the company name
    // heading for name
    // 'contact us' button; when clicked displays a pop-up with the contact info
    // 'get directions' link to google maps
    // link to website

    let div = createDiv({ class: `userDivs` }),
        compName = createHeading({ text: user.company.name.toUpperCase(), size: 2, class: `companyNames` }),
        slogan = createHeading({ text: `'${user.company.bs}'`, class: `slogans` }),
        ownName = createHeading({ text: `<small><small>CEO </small></small>${user.name}`, size: 3, class: `owner` }),
        contact = createButton({ text: `Contact Us`, class: `contact`, onClickFunc: getUser, id: `${user.id}Contact` }),
        location = `${user.address.geo.lat},${user.address.geo.lng}`,
        directions = createHREF({ display: `Get Directions`, ref: `https://www.google.com/maps/place/${location}`, newTab: true, class: `directions` }),
        website = createHREF({ display: `Check Out Our Website`, ref: `http://www.${user.website}`, newTab: true, class: `websites` }),
        interested = createButton({ text: `Add to interested`, class: `interestButtons`, onClickFunc: getUser, id: `${user.id}Interested` }),
        notInterested = createButton({ text: `Remove from interested`, class: `interestButtons`, onClickFunc: getUser, id: `${user.id}NotInterested` });

    // append children to parent nodes
    document.getElementById(`companysDiv`).appendChild(div);
    div.appendChild(compName);
    div.appendChild(slogan);
    div.appendChild(ownName);
    div.appendChild(directions);
    div.appendChild(website);
    div.appendChild(interested);
    div.appendChild(notInterested);
    div.appendChild(contact);

    notInterested.style.display = `none`;

}

function getUser() {

    // get the ID from the user
    // create new XHR where the endpoint is the URL to that specific users data
    // open channel function
    // onload function
    // get raw
    // parse raw
    // set parsed to user data var
    // call contact us display function
    // send function

    console.log(this.id); // see what ID is being passed
    let userID = this.id.replace(/([A-z])\w+/, ``);
    console.log(userID);

    let xhr = new XMLHttpRequest(),
        reqMeth = 'GET',
        ep = `https://jsonplaceholder.typicode.com/users/${userID}`,
        async = true;

    xhr.open(reqMeth, ep, async); // initialize api request/open channel

    xhr.onload = () => {

        let rawRes = xhr.responseText,
            parsedRes = JSON.parse(rawRes);

        console.log(parsedRes); // shows what user's data we're working with

        let userData = parsedRes;

        switch (this.id) {
            case `${userID}Contact`:

                contactDisplay(userData);

                break;
            case `${userID}Interested`:

                interestedFunc(userData);

                break;
            case `${userID}NotInterested`:

                notInterestedFunc(userData);

                break;

        }

    };

    xhr.send();

}

function interestedFunc(user) {

    // create heading for company name
    // append heading to sidebar
    // interested button hide
    // not interested button appear

    console.log(user);

    let heading = createHeading({ id: `${user.name}Sidebar`, class: `sidebarNames`, text: `${user.company.name.toUpperCase()}`, size: 3 });
    document.getElementById(`sidebar`).appendChild(heading);
    document.getElementById(`${user.id}Interested`).style.display = `none`;
    document.getElementById(`${user.id}NotInterested`).style.display = `initial`;

}

function notInterestedFunc(user) {

    // remove heading from sidebar
    // not interested button hide
    // interested button appear

    console.log(user);
    document.getElementById(`${user.id}NotInterested`).style.display = `none`;
    document.getElementById(`${user.id}Interested`).style.display = `initial`;
    document.getElementById(`${user.name}Sidebar`).remove();

}

function contactDisplay(user) {

    // phone number var
    // email var
    // address var

    let phone = user.phone,
        email = user.email,
        userAdd = user.address,
        address = `${userAdd.street} ${userAdd.suite}, ${userAdd.city} ${userAdd.zipcode}`;

    alert(`Phone: ${phone}\nEmail: ${email}\nMailing Address: ${address}`);

}

function createSidebar() {

    let heading = createHeading({ id: `sidebarHead`, text: `INTERESTS` });
    document.getElementById(`sidebar`).appendChild(heading);

}

// FUNCTIONS FOR CREATING HTML ELEMENTS
function createDiv(divObj) {

    // id, class

    let div = document.createElement(`div`);

    div.id = divObj.id != undefined && document.getElementById(divObj.id) == null ? divObj.id : ``;

    div.className = divObj.class != undefined ? divObj.class : ``;

    return div

};

function createHeading(headingObj) {

    // size, text, id, class

    let heading = headingObj.size >= 1 && headingObj.size <= 5 ? document.createElement(`h` + headingObj.size) : document.createElement(`h5`);

    heading.innerHTML = typeof headingObj.text == `string` ? headingObj.text : `>> No text <<`;

    heading.id = headingObj.id != undefined && document.getElementById(headingObj.id) == null ? headingObj.id : ``;

    heading.className = headingObj.class != undefined ? headingObj.class : ``;

    return heading

};

function createParagraph(paraObj) {

    // text

    let paragraph = document.createElement(`p`);

    paragraph.innerHTML = paraObj.text != undefined ? paraObj.text : `>> No Text <<`;

    return paragraph

}

function createImage(imageObj) {

    // src, alt, id, class

    let image = document.createElement(`img`);

    image.src = imageObj.src != undefined ? imageObj.src : `images/default.jpg`;

    image.alt = imageObj.alt != undefined ? imageObj.alt : `image couldn't load; broke`;

    image.id = imageObj.id != undefined && document.getElementById(imageObj.id) == null ? imageObj.id : ``;

    image.className = imageObj.class != undefined ? imageObj.class : ``;

    return image

};

function createButton(buttonObj) {

    // id, class, text, onClickFunc

    let button = document.createElement(`button`);

    button.id = buttonObj.id != undefined && document.getElementById(buttonObj.id) == null ? buttonObj.id : ``;

    button.className = buttonObj.class != undefined ? buttonObj.class : ``;

    button.innerHTML = typeof buttonObj.text == `string` ? buttonObj.text : `>> No Text <<`;

    button.onclick = buttonObj.onClickFunc != undefined && typeof buttonObj.onClickFunc == `function` ? buttonObj.onClickFunc : `>> No function <<`;

    return button

};

function createHREF(hrefObj) {

    // id, newTab (true or false), ref, display (wether text, image, ect.), class

    let href = document.createElement(`a`);

    href.id = hrefObj.id != undefined && document.getElementById(hrefObj.id) == null ? hrefObj.id : ``;

    href.target = hrefObj.newTab === true ? href.target = `_blank` : ``;

    href.href = hrefObj.ref != undefined ? hrefObj.ref : `>> No Referenece <<`;

    href.innerHTML = hrefObj.display != undefined ? hrefObj.display : `>> No Display <<`;

    href.className = hrefObj.class != undefined ? hrefObj.class : ``;

    return href
};