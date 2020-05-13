let body = document.body,
    currentPage = 1,
    lastPage, // is assigned a value later within the intial GET request in xhrReqs.js line 27
    storedData = {};

window.onload = () => { // uiDiv, usersDiv, prevButton, nextButton

    const uiDiv = createDiv({ id: `uiDiv` }),
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

function displayUsers(users) { // clear usersDiv, create: div1 => page heading, users divs w/ data; div2 => editing user data with inputs

    usersDiv.innerHTML = ``;

    let pageHeading = createHeading({ text: `Viewing Page #${currentPage}`, size: 2, id: `pageHeading` });

    usersDiv.appendChild(pageHeading);

    let pageData = [];

    users.forEach(user => {

        pageData.push(user);

        let div = createDiv({ id: user.id, class: `userDivs` }),
            displayDiv = createDiv({ class: `displayDivs` }),
            editDiv = createDiv({ class: `editDivs` }),
            displayUiDiv = createDiv({ class: `displayUiDivs` }),
            editUiDiv = createDiv({ class: `editUiDivs` }),
            userName = createHeading({ text: `${user.first_name} ${user.last_name}`, size: 3, class: `userNames` }),
            dateOfBirth = createHeading({ text: `DoB: ${user.dob}`, size: 4, class: `dateOfBitrhs` }),
            address = createHeading({ text: user.address, size: 5, class: `addresses` }),
            email = createHeading({ text: user.email, size: 5, class: `emails` }),
            editButton = createButton({ text: `Edit User`, onClickFunc: editUser }),
            deleteButton = createButton({ text: `Delete User`, onClickFunc: deleteUser }),
            fNameInput = createInput({ class: `nameInputs`, pHolder: `New First Name`, name: `first_name` }),
            lNameInput = createInput({ class: `nameInputs`, pHolder: `New Last Name`, name: `last_name` }),
            dobInput = createInput({ class: `dobInputs`, pHolder: `New DoB YYYY-MM-DD`, name: `dob` }),
            addressInput = createInput({ class: `addressInputs`, pHolder: `New Address`, name: `address` }),
            emailInput = createInput({ class: `emailInputs`, pHolder: `New Email`, name: `email` }),
            confirmButton = createButton({ text: `Confirm`, onClickFunc: confirmEdit }),
            cancelButton = createButton({ text: `Cancel`, onClickFunc: cancelEdit });

        // main divs for each user appended to parents
        usersDiv.appendChild(div);
        div.appendChild(displayDiv);
        div.appendChild(editDiv);

        // initial DOM layout
        displayDiv.appendChild(userName);
        displayDiv.appendChild(dateOfBirth);
        displayDiv.appendChild(address);
        displayDiv.appendChild(email);
        displayDiv.appendChild(displayUiDiv);
        displayUiDiv.appendChild(editButton);
        displayUiDiv.appendChild(deleteButton);

        // appearance in a user edit mode
        editDiv.appendChild(fNameInput);
        editDiv.appendChild(lNameInput);
        editDiv.appendChild(dobInput);
        editDiv.appendChild(addressInput);
        editDiv.appendChild(emailInput);
        editDiv.appendChild(editUiDiv);
        editUiDiv.appendChild(cancelButton);
        editUiDiv.appendChild(confirmButton);

        // editDiv initially has display of none
        editDiv.style.display = `none`;

    });

    storedData[`page${currentPage}`] = pageData;

    console.log(`Stored Pages`, storedData);
};

function editUser() { // display none => displayDiv, display initial => editDiv

    let displayDiv = this.parentNode.parentNode,
        editDiv = this.parentNode.parentNode.parentNode.childNodes[1];

    displayDiv.style.display = `none`;
    editDiv.style.display = `initial`;

};

function deleteUser() { // user confrim, if confirmed => DELETE request made with userID, userDiv removed from DOM, otherwise user not deleted

    let userID = this.parentNode.parentNode.parentNode.id,
        confirm = prompt(`Type CONFIRM to make this deletion`);

    if (confirm != null && confirm.toLowerCase() == `confirm`) {

        deleteUserReq(userID);
        document.getElementById(`${userID}`).remove();

    } else { alert(`User not deleted`); }

};

function cancelEdit() { // display none => editDiv, display initial => displayDiv, clears inputs value

    let editDiv = this.parentNode.parentNode,
        displayDiv = this.parentNode.parentNode.parentNode.childNodes[0],
        inputs = Array.from({ length: editDiv.childNodes.length - 1 }, (a, b) => editDiv.childNodes[b]);

    inputs.forEach(input => { input.value = `` });

    editDiv.style.display = `none`;
    displayDiv.style.display = `initial`;
};

function confirmEdit() { // create a request body object filled with input data, call updateUserReq() with reqBody and userID as arguments

    let editDiv = this.parentNode.parentNode,
        userDivID = editDiv.parentNode.id,
        displayDiv = this.parentNode.parentNode.parentNode.childNodes[0],
        inputs = [],
        reqBody = {};

    editDiv.childNodes.forEach(child => {

        if (child.localName == `input` && child.value.trim() != '') {

            switch (child.name) {

                case 'first_name':

                    reqBody[child.name] = child.value.trim();
                    inputs.push(child);

                    break;

                case 'last_name':

                    reqBody[child.name] = child.value.trim();
                    inputs.push(child);

                    break;

                case 'address':

                    reqBody[child.name] = child.value.trim();
                    inputs.push(child);

                    break;

                case 'dob':

                    // sanitize

                    break;

                case 'email':

                    // sanitize

                    break;

            }

        }

    });

    if (Object.keys(reqBody) == 0) { return alert('Pleae fill out at least one field before confirming'); }

    updateUserReq({ newData: reqBody, userID: userDivID });

    editDiv.style.display = `none`;
    displayDiv.style.display = `initial`;

    inputs.forEach(input => { input.value = `` });

};