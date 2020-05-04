// when the window loads it runs this function
window.onload = () => {

    requestAllUsers();

}

function requestAllUsers() {

    let xhr = new XMLHttpRequest();
    // `new` creates a new instance of the XMLH.. object
    // without the `new` vsCode will assume that XMLH... is a function call

    let reqMethod = `GET`, // REQUEST METHOD
        endpoint = `https://api.github.com/users`, // ENDPOINT
        async = true; // ASYNCHRO.

    xhr.open(reqMethod, endpoint, async); // initailize the api request

    xhr.onload = () => { // handle the api response

        let rawResponse = xhr.responseText,
            parsedResponse = JSON.parse(rawResponse);

        console.log(parsedResponse[0]); // to know what key/value pair im wokring with

        for (let a = 0; a < parsedResponse.length; a++) {

            let user = parsedResponse[a]; // an object with a users properties

            // front end work
            displayUser(user);

        }

    }

    xhr.send(); // if we need to; this will pass information with the request, in the form of a JSON object

}

function displayUser(user) {

    console.log(user.login);

    // div for each user
    let userDiv = createDiv({ class: `userDiv` });
    // heaind for their username
    let userHead = createHeading({ text: user.login.toUpperCase(), size: 2 });
    // image for their profile pic
    let profilePic = createImage({ src: user.avatar_url, alt: `${user.login}'s Profile Pic` });
    // link to their GitHub
    let usersGitHub = createHREF({ display: `> ${user.login.toUpperCase()}'s GitHub <`, ref: user.html_url, newTab: true });
    // button that shows more info (appends more info to their div)
    let moreInfo = createButton({ text: `More Info on ${user.login}`, id: `${user.login}MoreInfo`, onClickFunc: displayInfo });
    // moreInfo.onclick = () => displayInfo(user.login);
    // button that hides the more info data
    let hideInfo = createButton({ text: `Hide Info`, id: user.login, onClickFunc: lessInfo });
    // hideInfo.onclick = () => hideInfo(user.login);

    // append elements to respective parents
    document.getElementById(`allUsers`).appendChild(userDiv);
    userDiv.appendChild(userHead);
    userDiv.appendChild(profilePic);
    userDiv.appendChild(usersGitHub);
    userDiv.appendChild(moreInfo);
    userDiv.appendChild(hideInfo);
    hideInfo.style.display = `none`;

}

// make a request for a specific user to get more detailed information displayed to their div
function displayInfo() {

    console.log(this);

    let username = this.innerText.replace(/More Info on /, ``),
        parent = this.parentNode; // using this to appened elements to instead of creating a div ID

    console.log(username);
    console.log(parent);

    // make a request
    let xhr = new XMLHttpRequest();

    let reqMethod = 'GET',
        endpoint = `https://api.github.com/users/${username}`,
        async = true;

    xhr.open(reqMethod, endpoint, async);

    xhr.onload = () => {

        let rawResponse = xhr.responseText,
            parsedResponse = JSON.parse(rawResponse),
            followersHead = createHeading({ size: 5, text: `Followers: ${parsedResponse.followers}`, id: `${username}Followers` }),
            followingHead = createHeading({ size: 5, text: `Following: ${parsedResponse.following}`, id: `${username}Following` }),
            githubRepos = createHeading({ size: 5, text: `GitHub Repos: ${parsedResponse.public_repos}`, id: `${username}Repos` });

        console.log(parsedResponse);

        parent.appendChild(followersHead);
        parent.appendChild(followingHead);
        parent.appendChild(githubRepos);
        parent.insertBefore(followersHead, document.getElementById(`${username}`));
        parent.insertBefore(followingHead, document.getElementById(`${username}`));
        parent.insertBefore(githubRepos, document.getElementById(`${username}`));

    }

    xhr.send();

    // once clicked make the more info button disappear and the hide info button appear
    document.getElementById(`${username}MoreInfo`).style.display = `none`;
    document.getElementById(`${username}`).style.display = `initial`;


}

function lessInfo() {

    console.log(this.id);

    // once clicked make the more info button reappear but the data created by it removed
    document.getElementById(`${this.id}`).style.display = `none`;
    document.getElementById(`${this.id}MoreInfo`).style.display = `initial`;
    document.getElementById(`${this.id}Followers`).remove();
    document.getElementById(`${this.id}Following`).remove();
    document.getElementById(`${this.id}Repos`).remove();

}

// CREATE HTML ELEMENT FUNCTIONS
function createDiv(divObj) {

    // id, class

    let div = document.createElement(`div`);

    div.id = divObj.id != undefined && document.getElementById(divObj.id) == null ? divObj.id : `>> No ID <<`;

    div.className = divObj.class != undefined ? divObj.class : ``;

    return div

};

function createHeading(headingObj) {

    // size, text, id

    let heading = headingObj.size >= 1 && headingObj.size <= 5 ? document.createElement(`h` + headingObj.size) : document.createElement(`h5`);

    heading.innerHTML = typeof headingObj.text == `string` ? headingObj.text : `>> No text <<`;

    heading.id = headingObj.id != undefined && document.getElementById(headingObj.id) == null ? headingObj.id : `>> No ID <<`;

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

    image.id = imageObj.id != undefined && document.getElementById(imageObj.id) == null ? imageObj.id : `>> No ID <<`;

    image.className = imageObj.class != undefined ? imageObj.class : ``;

    return image

};

function createButton(buttonObj) {

    // id, class, text, onClickFunc

    let button = document.createElement(`button`);

    button.id = buttonObj.id != undefined && document.getElementById(buttonObj.id) == null ? buttonObj.id : `>> No ID <<`;

    button.className = buttonObj.class != undefined ? buttonObj.class : ``;

    button.innerHTML = typeof buttonObj.text == `string` ? buttonObj.text : `>> No Text <<`;

    button.onclick = buttonObj.onClickFunc != undefined && typeof buttonObj.onClickFunc == `function` ? buttonObj.onClickFunc : `>> No function <<`;

    return button

};

function createHREF(hrefObj) {

    // id, newTab (true or false), ref, display (wether text, image, ect.)

    let href = document.createElement(`a`);

    href.id = hrefObj.id != undefined && document.getElementById(hrefObj.id) == null ? hrefObj.id : `>> No ID <<`;

    href.target = hrefObj.newTab === true ? href.target = `_blank` : ``;

    href.href = hrefObj.ref != undefined ? hrefObj.ref : `>> No Referenece <<`;

    href.innerHTML = hrefObj.display != undefined ? hrefObj.display : `>> No Display <<`;

    return href
};