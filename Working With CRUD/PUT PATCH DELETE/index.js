let allPosts, // Global array of the posts being gathered from the JSON Placeholder API
    body = document.body,
    viewingUser = 1, // Used to display certain user and their posts on the DOM later
    deletedPosts = [];
//^ An array that will store the deleted posts so that when switching bewteen users, the deleted posts will stay deleted until page is refreshed

// Onload function that will create the DOM layout
window.onload = () => { // uiDiv, postsDiv, prevButton, nextButton, reqPosts() called

    let uiDiv = createDiv({ id: `uiDiv` }),
        postsDiv = createDiv({ id: `postsDiv` }),
        prevButton = createButton({ id: `prevButton`, text: `Previous User`, onClickFunc: prevUser }),
        nextButton = createButton({ id: `nextButton`, text: `Next User`, onClickFunc: nextUser });

    body.appendChild(uiDiv);
    body.appendChild(postsDiv);
    uiDiv.appendChild(prevButton);
    uiDiv.appendChild(nextButton);

    reqPosts();

};

function prevUser() { // viewingUser num sub, displayPosts() called

    viewingUser = viewingUser == 1 ? 10 : viewingUser - 1;

    displayPosts();

};

function nextUser() { // viewingUser num add, displayPosts() called

    viewingUser = viewingUser == 10 ? 1 : viewingUser + 1;

    displayPosts();

};

function reqPosts() { // XHR parsed and data assigned to global allPosts var, creating first users posts displayed

    let postsXHR = new XMLHttpRequest(),
        endpoint = `https://jsonplaceholder.typicode.com/posts`;

    postsXHR.open('GET', endpoint);

    postsXHR.onload = () => {

        let resData = JSON.parse(postsXHR.responseText);

        allPosts = resData;

        displayPosts();

    };

    postsXHR.send();

};

function displayPosts() { // clear postsDiv, viewingUser array of posts, DOM display of posts that aren't deleted

    postsDiv.innerHTML = ``;

    let userHeading = createHeading({ text: `Currently Viewing User #${viewingUser}'s Posts`, size: 2, id: `userHeading` });

    postsDiv.appendChild(userHeading);

    if (deletedPosts.length != 0) {
        //^ This checks if any posts from the specific user has been deleted and then removes it from the allPosts array so that it won't be recreated

        deletedPosts.forEach(delPost => {

            allPosts.forEach(post => {

                if (post.id == delPost.id) {

                    let postInd = allPosts.indexOf(post);

                    allPosts.splice(postInd, 1);

                }

            });

        });

    }


    allPosts.forEach(post => {

        // if (sessionStorage.getItem(`post${post.id}`) != null) {

        //     let postInd = allPosts.indexOf(post);

        //     allPosts.splice(postInd, 1);

        // }
        //^ session storage code

        if (post.userId == viewingUser) {

            let div = createDiv({ id: post.id }),
                postUI = createDiv({ class: `postUIs` }),
                title = createHeading({ text: post.title, size: 3, class: `titles` }),
                body = createParagraph({ text: post.body, class: `bodys` }),
                editButton = createButton({ text: `EDIT`, onClickFunc: editPost }),
                deleteButton = createButton({ text: `DELETE`, onClickFunc: deletePost });

            div.appendChild(title);
            div.appendChild(body);
            div.appendChild(postUI);
            postUI.appendChild(editButton);
            postUI.appendChild(deleteButton);
            postsDiv.appendChild(div);

        };

    });

};

function editPost() { // allow user to edit post, PUT or PATCH req to DB

    let postDiv = this.parentNode.parentNode,
        postTitle = postDiv.childNodes[0],
        postBody = postDiv.childNodes[1],
        postUI = postDiv.childNodes[2];

    if (postDiv.childNodes[3] != null) { postDiv.childNodes[3].remove(); }

    let form = createForm({}),
        titleInput = createInput({ type: `text`, name: `title`, value: postTitle.innerText }),
        bodyInput = createInput({ type: `text`, name: `body`, value: postBody.innerText }),
        cancelInput = createInput({ type: `button`, value: `CANCEL`, onClickFunc: cancelProcess }),
        confirmInput = createInput({ type: `button`, value: `CONFIRM`, onClickFunc: confirmChange });

    postTitle.style.display = `none`;
    postBody.style.display = `none`;
    postUI.style.display = `none`;
    form.appendChild(titleInput);
    form.appendChild(bodyInput);
    form.appendChild(cancelInput);
    form.appendChild(confirmInput);
    postDiv.appendChild(form);

};

function cancelProcess() { // makes postDiv previous elements reappear

    let postDiv = this.parentNode.parentNode,
        postTitle = postDiv.childNodes[0],
        postBody = postDiv.childNodes[1],
        postUI = postDiv.childNodes[2],
        form = this.parentNode;

    postTitle.style.display = `inherit`;
    postBody.style.display = `inherit`;
    postUI.style.display = `inherit`;
    form.style.display = `none`;

};

function confirmChange() { // checks form data and creates an object to pass as an arguement to the dataChange function with neccessary API request method

    let form = this.parentNode,
        postData = {};

    for (const input of form) {

        if (input.type == 'text' && input.value.trim() != '') { postData[input.name] = input.value.trim(); }

    }

    // conditons to decide if the request is going to be made
    let postDataLength = Object.keys(postData).length;

    if (postDataLength != 0 && postDataLength < form.length - 2) { // PATCH method

        dataChange({
            reqBody: postData,
            method: 'PATCH',
            postID: form.parentNode.id,
            postDiv: form.parentNode
        });

        console.log(`PATCH`);

    } else if (postDataLength == form.length - 2) { // PUT method

        dataChange({
            reqBody: postData,
            method: 'PUT',
            postID: form.parentNode.id,
            postDiv: form.parentNode
        });

        console.log(`PUT`);

    } else { // if all inputs were left blank then don't request the API

        alert('You must fill out at least 1 field');
        return

    }

};

function dataChange(reqObj) { // makes request, replaces old elements w/ new, hides form, reappears title and body

    let postDiv = reqObj.postDiv,
        changeXHR = new XMLHttpRequest(),
        endpoint = `https://jsonplaceholder.typicode.com/posts/${reqObj.postID}`,
        method = reqObj.method;

    changeXHR.open(method, endpoint);

    changeXHR.onload = () => {

        for (const k in reqObj.reqBody) {

            switch (k) {

                case `title`:

                    let newTitle = createHeading({ text: reqObj.reqBody[k], class: `titles`, size: 3 }),
                        oldTitle = document.getElementById(reqObj.postID).childNodes[0];

                    postDiv.replaceChild(newTitle, oldTitle);

                    break;

                case `body`:

                    let newBody = createParagraph({ text: reqObj.reqBody[k], class: `bodys` }),
                        oldBody = document.getElementById(reqObj.postID).childNodes[1];

                    postDiv.replaceChild(newBody, oldBody);

                    break;

            }

        }

        let postTitle = postDiv.childNodes[0],
            postBody = postDiv.childNodes[1],
            postUI = postDiv.childNodes[2],
            form = postDiv.childNodes[3];

        postTitle.style.display = `inherit`;
        postBody.style.display = `inherit`;
        postUI.style.display = `inherit`;
        form.style.display = `none`;

    };

    let body = JSON.stringify(reqObj.reqBody);

    changeXHR.send(body);

};

function deletePost() { // remove post from DOM, DELETE req to DB

    let postDiv = this.parentNode.parentNode, // post div
        postID = postDiv.id,
        delXHR = new XMLHttpRequest(),
        endpoint = `https://jsonplaceholder.typicode.com/posts/${postID}`;

    delXHR.open('DELETE', endpoint);

    delXHR.onload = () => {

        let resData = JSON.parse(delXHR.responseText);

        console.log(resData);

    };

    delXHR.send();

    // sessionStorage.setItem(`post${postID}`, postID);
    //^ session storage way

    deletedPosts.push(postDiv);
    postDiv.remove(); // removing post div from postsDiv

    console.log(deletedPosts);

};