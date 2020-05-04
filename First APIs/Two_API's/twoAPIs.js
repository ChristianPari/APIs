// choosen breed: husky

window.onload = () => {

    let div = createDiv({ id: `mainDiv` });
    document.body.appendChild(div);

    reqDogPics();

}

function reqDogPics() {

    // xhr
    // get pic links
    // bc pic links can only be obtained 1 at a time; use a loop to get as many as needed
    // store them somewhere

    let count = 0,
        numOfImgs = 10,
        dogPics = [];

    while (count < numOfImgs) {

        let xhr = new XMLHttpRequest();
        const endpoint = `https://dog.ceo/api/breed/husky/images/random`;

        xhr.open('GET', endpoint, true);

        xhr.onload = () => {

            let data = JSON.parse(xhr.responseText);

            dogPics.push(data.message);

            // created code that makes sure that the whole request for dog pictures is completed before continuing to the code within this if statement
            if (dogPics.length == numOfImgs) {

                reqUserData(dogPics);

            }

        };

        xhr.send();

        count++

    }

}

function reqUserData(picsArray) {

    console.log(picsArray); // checks for pics data

    // xhr for JSON API
    // create a front-end display for each user; integrate dog pics for each user

    let xhr = new XMLHttpRequest();
    const endpoint = `https://jsonplaceholder.typicode.com/users`;

    xhr.open('GET', endpoint, true);

    xhr.onload = () => {

        // parse raw data; set to var
        // iterate through the data

        let data = JSON.parse(xhr.responseText);

        console.log(data[0]); // seeing what the user data looks like that I'm working with

        for (let a = 0; a < data.length; a++) {

            displayUser(data[a], picsArray[a]); // passing these pieces of data in as params to be used inside the indivual user function

        }

    };

    xhr.send();

}

function displayUser(user, picURL) {

    // heading for company name
    // heading for ceo name
    // img for ceo/dog pic
    // link to website
    const userDiv = createDiv({ class: `userDivs` }),
        compName = createHeading({ text: `${user.company.name.toUpperCase()}`, class: `compNames`, size: 3, id: `${user.company.name}` }),
        slogan = createHeading({ text: `'${user.company.bs}'`, class: `slogan` }),
        ceoName = createHeading({ text: `<small><small>CEO</small></small> ${user.name}`, class: `ceoNames`, size: 4, id: `${user.name}` }),
        ceoPic = createImage({ src: picURL, alt: `dog pic for ${user.name}`, id: `${user.name}Pic`, class: `ceoPics` }),
        location = `${user.address.geo.lat},${user.address.geo.lng}`,
        directions = createHREF({ display: `Get Directions`, ref: `https://www.google.com/maps/place/${location}`, newTab: true, class: `directions` }),
        website = createHREF({ ref: `https://${user.website}`, id: `${user.name}Website`, display: `${user.name}'s Website`, newTab: true, class: `websites` });

    // append children to parents in choosen order to display
    document.getElementById(`mainDiv`).appendChild(userDiv);
    userDiv.appendChild(compName);
    userDiv.appendChild(slogan);
    userDiv.appendChild(ceoPic);
    userDiv.appendChild(ceoName);
    userDiv.appendChild(website);
    userDiv.appendChild(directions);

}

// HTML FUNCTIONS
function createDiv(divObj) {

    // id, class

    let div = document.createElement(`div`);

    div.id = divObj.id != undefined && document.getElementById(divObj.id) == null ? divObj.id : `>> No ID <<`;

    div.className = divObj.class != undefined ? divObj.class : ``;

    return div

};

function createHeading(headingObj) {

    // size, text, id, class

    let heading = headingObj.size >= 1 && headingObj.size <= 5 ? document.createElement(`h` + headingObj.size) : document.createElement(`h5`);

    heading.innerHTML = typeof headingObj.text == `string` ? headingObj.text : `>> No text <<`;

    heading.id = headingObj.id != undefined && document.getElementById(headingObj.id) == null ? headingObj.id : `>> No ID <<`;

    heading.className = headingObj.class != undefined ? headingObj.class : ``;

    return heading

};

function createImage(imageObj) {

    // src, alt, id, class

    let image = document.createElement(`img`);

    image.src = imageObj.src != undefined ? imageObj.src : `images/default.jpg`;

    image.alt = imageObj.alt != undefined ? imageObj.alt : `image couldn't load; broke`;

    image.id = imageObj.id != undefined && document.getElementById(imageObj.id) == null ? imageObj.id : `>> No ID <<`;

    image.className = imageObj.class != undefined ? imageObj.class : ``;

    return image

};

function createHREF(hrefObj) {

    // id, newTab (true or false), ref, display (wether text, image, ect.), class

    let href = document.createElement(`a`);

    href.id = hrefObj.id != undefined && document.getElementById(hrefObj.id) == null ? hrefObj.id : `>> No ID <<`;

    href.target = hrefObj.newTab === true ? href.target = `_blank` : ``;

    href.href = hrefObj.ref != undefined ? hrefObj.ref : `>> No Referenece <<`;

    href.innerHTML = hrefObj.display != undefined ? hrefObj.display : `>> No Display <<`;

    href.className = hrefObj.class != undefined ? hrefObj.class : ``;

    return href
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