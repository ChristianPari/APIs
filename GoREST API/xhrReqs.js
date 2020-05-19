const apiKey = `ADD API KEY`;

function reqUsers(pageNum) { //* GET request for all users data per specified page, call displayUsers()

    if (storedData.hasOwnProperty(`page${pageNum}`)) {

        displayUsers(storedData[`page${pageNum}`]);
        return

    }

    let reqXHR = new XMLHttpRequest(),
        endpoint = `https://gorest.co.in/public-api/users?access-token=${apiKey}&page=${pageNum}`;

    reqXHR.open('GET', endpoint);

    reqXHR.onload = () => {

        let usersRes = JSON.parse(reqXHR.responseText),
            allUsers = usersRes.result;

        console.log(`Initial Response for page ${pageNum}`, usersRes);
        console.log(`User Data for page ${pageNum}`, allUsers);

        displayUsers(allUsers);

        lastPage = usersRes._meta.pageCount;

    }

    reqXHR.send();

};

function deleteUserReq(userID) { //* DELETE request for specified userID

    let delXHR = new XMLHttpRequest(),
        endpoint = `https://gorest.co.in/public-api/users/${userID}?access-token=${apiKey}`;

    delXHR.open('DELETE', endpoint);

    delXHR.onload = () => {};

    delXHR.send();

};

function updateUserReq(upObj) { //* PATCH request for specified user

    console.log(upObj.newData);
    let updateXHR = new XMLHttpRequest(),
        endpoint = `https://gorest.co.in/public-api/users/${upObj.userID}?access-token=${apiKey}`;

    updateXHR.open('PATCH', endpoint);

    updateXHR.onload = () => {

        let updatedRes = JSON.parse(updateXHR.responseText);

        if (updatedRes._meta.success == true) {

            updateDOM({ data: upObj.newData, divID: upObj.userID });

        } else {

            let subErrorsArr = updatedRes.result,
                subErrorsMess = ``;

            subErrorsArr.forEach(error => {

                subErrorsMess += `Error ${subErrorsArr.indexOf(error) + 1}). Field '${error.field}': '${error.message}'\n`;

            });

            subErrorsMess += `Please fix and reconfirm`;

            alert(`${subErrorsMess}`);

        }

    };

    updateXHR.setRequestHeader('Content-Type', 'application/json');

    let body = JSON.stringify(upObj.newData);
    updateXHR.send(body);

};

function createUser(body) { //* POST request for a new user

    let createXHR = new XMLHttpRequest(),
        endpoint = `https://gorest.co.in/public-api/users`; // apiKey is not needed when using Authorization header with Bearer Tokensa

    createXHR.open('POST', endpoint);

    createXHR.onload = () => {

        storedData = {};

    };

    createXHR.setRequestHeader('Content-Type', 'application/json');
    createXHR.setRequestHeader('Authorization', `Bearer ${apiKey}`);

    let newBody = JSON.stringify(body);

    createXHR.send(newBody);

};

function getUserPosts(userID, userName) { //* GET request for all the posts made by the specified user

    let postsXHR = new XMLHttpRequest(),
        endpoint = `https://gorest.co.in/public-api/posts?_format=json&access-token=${apiKey}&user_id=${userID}`;

    postsXHR.open('GET', endpoint);

    postsXHR.onload = () => {

        let res = JSON.parse(postsXHR.responseText),
            posts = res.result;

        if (posts.length == 0) { return alert('This user has no posts'); }

        displayPosts(userName, posts);

    };

    postsXHR.send();

};

// vscode-fold=1