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
                title = createHeading({ text: post.title, size: 3 }),
                body = createParagraph({ text: post.body }),
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

    deletedPosts.push(post);
    postDiv.remove(); // removing post div from postsDiv

    console.log(deletedPosts);

};