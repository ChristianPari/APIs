window.onload = () => {

    // request all posts => array of 100 posts
    let xhr = new XMLHttpRequest(),
        endpoint = `https://jsonplaceholder.typicode.com/posts`,
        posts = [];

    xhr.open('GET', endpoint);

    xhr.onload = () => {

        let res = JSON.parse(xhr.responseText);

        for (let a = 0; a < 10; a++) {

            posts.push(res[a]);

        }

        createPosts(posts);

    };

    xhr.send();

};

function createPosts(posts) {

    for (const post of posts) {

        let div = createDiv({ class: `postDiv`, id: post.id }),
            userId = createHeading({ text: `User ${post.userId}`, id: ``, class: `userIds`, size: 2 }),
            title = createHeading({ text: post.title.toUpperCase(), class: `titles`, id: ``, size: 3 }),
            body = createParagraph({ text: post.body, class: `bodys`, id: `` }),
            postId = createHeading({ text: `Post ${post.id}`, class: `postIds`, id: ``, size: 4 });

        postsDiv.appendChild(div);
        div.appendChild(userId);
        div.appendChild(title);
        div.appendChild(body);
        div.appendChild(postId);

    }

};

function compileFormData() {

    let postBody = {},
        postIdInput = formId.postId.value.trim();

    if (postIdInput == '' || isNaN(postIdInput) || postIdInput < 1 || postIdInput > 100) {

        alert('A post ID must be provided, must be a number between 1 and 100');

        return

    }

    for (const input of formId) {

        if (input.type == 'text' && input.name != 'postId' && input.value.trim() != '') {

            postBody[input.name] = input.value.trim();

        }

    }

    // conditons to decide if the request is going to be made
    let postBodyLength = Object.keys(postBody).length;

    if (postBodyLength != 0 && postBodyLength < formId.length - 2) { // PATCH method

        updatedReq({
            reqBody: postBody,
            method: 'PATCH',
            postId: postIdInput
        });

        document.getElementsByName(`userId`).value = document.getElementsByName(`userId`).defaultValue;

    } else if (postBodyLength == formId.length - 2) { // PUT method

        updatedReq({
            reqBody: postBody,
            method: 'PUT',
            postId: postIdInput
        });

    } else { // if all inputs were left blank then don't request the API

        alert('You must fill out at least 1 field');

    }

    formId.reset();

};

function updatedReq(reqObj) {

    let xhr = new XMLHttpRequest(),
        endpoint = `https://jsonplaceholder.typicode.com/posts/${reqObj.postId}`;

    xhr.open(reqObj.method, endpoint);

    xhr.onload = () => { // calback function

        let object = reqObj.reqBody;

        for (const k in object) {

            switch (k) {

                case `userId`:

                    let newUserId = createHeading({ text: `User ${object[k]}`, class: `userIds`, id: ``, size: 2 }),
                        oldUserId = document.getElementById(reqObj.postId).childNodes[0];

                    document.getElementById(reqObj.postId).replaceChild(newUserId, oldUserId);

                    break;

                case `title`:

                    let newTitle = createHeading({ text: object[k], class: `titles`, id: ``, size: 3 }),
                        oldTitle = document.getElementById(reqObj.postId).childNodes[1];

                    document.getElementById(reqObj.postId).replaceChild(newTitle, oldTitle);

                    break;

                case `body`:

                    let newBody = createParagraph({ text: object[k], class: `bodys`, id: `` }),
                        oldBody = document.getElementById(reqObj.postId).childNodes[2];

                    document.getElementById(reqObj.postId).replaceChild(newBody, oldBody);

                    break;

            }

        }

    };

    xhr.setRequestHeader('Content-Type', 'application/json');

    let jsonBody = JSON.stringify(reqObj.reqBody);

    xhr.send(jsonBody);

};