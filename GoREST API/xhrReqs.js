const apiKey = `oIPkz8yUCLZ_IDYhsYBjD2Swn1T0BcDEJoU3`;

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

        console.log(usersRes);
        console.log(allUsers);

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
        endpoint = `https://gorest.co.in/public-api/users/${userID}?access-token=${apiKey}`;

    updateXHR.open('PATCH', endpoint);

    updateXHR.onload = () => {

        let updatedRes = JSON.parse(updateXHR.responseText);

        console.log(updatedRes);

    };

    updateXHR.setRequestHeader('Content-Type', 'application/json');

    updateXHR.send(body);

};