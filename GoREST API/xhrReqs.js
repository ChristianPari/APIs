const apiKey = `f7PTYxjCIzQYQ5qdmmemFKNBBSXq9XDaC2tw`;

function reqUsers(pageNum) { // GET request for all users data per specified page, call displayUsers()

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

function deleteUserReq(userID) { // DELETE request for specified userID

    let delXHR = new XMLHttpRequest(),
        endpoint = `https://gorest.co.in/public-api/users/${userID}?access-token=${apiKey}`;

    delXHR.open('DELETE', endpoint);

    delXHR.onload = () => {};

    delXHR.send();

};

function updateUserReq(upObj) { // PATCH request for specified user

    let updateXHR = new XMLHttpRequest(),
        endpoint = `https://gorest.co.in/public-api/users/${upObj.userID}?access-token=${apiKey}`;

    updateXHR.open('PATCH', endpoint);

    updateXHR.onload = () => {

        let updatedRes = JSON.parse(updateXHR.responseText);

        console.log(updatedRes);

    };

    updateXHR.setRequestHeader('Content-Type', 'application/json');

    let body = JSON.stringify(upObj.newData);

    updateXHR.send(body);

};

function createUser(body) {
    console.log(body);
    let createXHR = new XMLHttpRequest(),
        endpoint = `https://gorest.co.in/public-api/users?access-token=${apiKey}`;

    createXHR.open('POST', endpoint);

    createXHR.onload = () => {

        let res = JSON.parse(createXHR.responseText);

        console.log(res);

    }

    createXHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    createXHR.setRequestHeader("Authorization", "Basic");

    createXHR.send(body);

};

// vscode-fold=1
//^ folding extension for vsCode that I utilize