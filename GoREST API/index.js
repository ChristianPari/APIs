let body = document.body,
    currentPage = 1,
    lastPage,
    storedData = {};

//! create a way to get very last page from the API to use instead of a hard coded number being used in the next/prev page btns
window.onload = () => { // uiDiv, usersDiv, prevButton, nextButton

    let uiDiv = createDiv({ id: `uiDiv` }),
        usersDiv = createDiv({ id: `usersDiv` }),
        prevPageBtn = createButton({ id: `prevPageBtn`, text: `Previous Page`, onClickFunc: prevPageFunc }),
        nextPageBtn = createButton({ id: `nextPageBtn`, text: `Next Page`, onClickFunc: nextPageFunc });

    body.appendChild(uiDiv);
    body.appendChild(usersDiv);
    uiDiv.appendChild(prevPageBtn);
    uiDiv.appendChild(nextPageBtn);

    reqUsers(currentPage);

};

function prevPageFunc() { // decrements page, if first page goes to last page

    currentPage = currentPage == 1 ? lastPage : currentPage - 1;
    reqUsers(currentPage);

};

function nextPageFunc() { // increments page, if last page goes to first page

    currentPage = currentPage == lastPage ? 1 : currentPage + 1;
    reqUsers(currentPage);

};

function displayUsers(users) { // clear usersDiv, create: page heading, users divs w/ data

    usersDiv.innerHTML = ``;

    let pageHeading = createHeading({ text: `Viewing Page #${currentPage}`, size: 2, id: `pageHeading` });

    usersDiv.appendChild(pageHeading);

    let pageData = [];

    users.forEach(user => {

        pageData.push(user);

        let div = createDiv({ id: user.id, class: `userDivs` }),
            uiDiv = createDiv({ class: `uiDivs` }),
            userName = createHeading({ text: `${user.first_name} ${user.last_name}`, size: 3, class: `userNames` }),
            gender = createHeading({ text: user.gender, size: 4, class: `genders` }),
            address = createHeading({ text: user.address, size: 5, class: `addresses` }),
            email = createHeading({ text: user.email, size: 5, class: `emails` }),
            editButton = createButton({ text: `Edit User`, onClickFunc: editUser }),
            deleteButton = createButton({ text: `Delete User`, onClickFunc: deleteUser });

        div.appendChild(userName);
        div.appendChild(gender);
        div.appendChild(address);
        div.appendChild(email);
        div.appendChild(uiDiv);
        uiDiv.appendChild(editButton);
        uiDiv.appendChild(deleteButton);
        usersDiv.appendChild(div);

    });

    storedData[`page${currentPage}`] = pageData;

    console.log(pageData);
    console.log(storedData);
};

function editUser() {



};

function deleteUser() { // user confrim, if confirmed => DELETE request made with userID, userDiv removed from DOM, otherwise user not deleted

    let userID = this.parentNode.parentNode.id,
        confirm = prompt(`Type CONFIRM to make this deletion`);

    if (confirm != null && confirm.toLowerCase() == `confirm`) {

        deleteUserReq(userID);
        document.getElementById(`${userID}`).remove();

    } else { alert(`User not deleted`); }

};