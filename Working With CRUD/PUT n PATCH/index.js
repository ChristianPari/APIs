window.onload = () => {

    // request all posts > array of 100 posts

    // itterate through the first 10-20 elements of the array
    // display each of those elements to the DOM

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

    } else if (postBodyLength == formId.length - 2) { // PUT method

        updatedReq({
            reqBody: postBody,
            method: 'PUT',
            postId: postIdInput
        });

    } else { // if all inputs were left blank then don't request the API

        alert('You must fill out at least 1 field');

    }

};

function updatedReq(reqObj) {

    let xhr = new XMLHttpRequest(),
        endpoint = `https://jsonplaceholder.typicode.com/posts/${reqObj.postId}`;

    xhr.open(reqObj.method, endpoint);

    xhr.onload = () => { // calback function
    };

    xhr.setRequestHeader('Content-Type', 'application/json');

    let jsonBody = JSON.stringify(reqObj.reqBody);

    xhr.send(jsonBody);

};