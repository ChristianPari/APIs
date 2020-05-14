let body = document.body,
    currentPage = 1,
    lastPage, // is assigned a value later within the intial GET request in xhrReqs.js line 27
    emailRegEx = /[A-z0-9]+[A-z0-9\.]+@[A-z0-9\.]+[A-z0-9]+/, // used to sanitize user email input in multiple functions
    sanitizeEmail = /\.+/g; // used to sanitize user email input in multiple functions
dobRegEx = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/,
    storedData = {};

window.onload = () => { // uiDiv, usersDiv, prevButton, nextButton

    let usersDiv = createDiv({ id: `usersDiv` }),
        uiDiv = createDiv({ id: `uiDiv` }),
        prevPageBtn = createButton({ id: `prevPageBtn`, text: `Previous Page`, onClickFunc: prevPageFunc }),
        nextPageBtn = createButton({ id: `nextPageBtn`, text: `Next Page`, onClickFunc: nextPageFunc }),
        newUserHeading = createHeading({ id: `newUserFormHead`, text: `Create New User`, size: 3 }),
        createUserForm = createForm({ id: `createUserForm` }),
        fNameInput = createInput({ type: `text`, id: `firstNameInput`, pHolder: `First Name`, name: `first_name` }),
        lNameInput = createInput({ type: `text`, id: `lastNameInput`, pHolder: `Last Name`, name: `last_name` }),
        dobInput = createInput({ type: `text`, id: `dobInput`, pHolder: `DoB YYYY-MM-DD`, name: `dob` }),
        addressInput = createInput({ type: `text`, id: `addressInput`, pHolder: `Address`, name: `address` }),
        emailInput = createInput({ type: `text`, id: `emailInput`, pHolder: `Email`, name: `email` }),
        confirmNewButton = createInput({ type: `button`, id: `confrimNewButton`, value: `Confirm`, onClickFunc: `` }),
        genderSelect = document.createElement(`select`);
    genderSelect.id = `genderSelect`;
    genderSelect.name = `gender`;
    genderSelect.onchange = genderChange;

    let defaultGender = document.createElement(`option`);
    defaultGender.innerText = `Select Gender`;
    defaultGender.value = ``;

    let male = document.createElement(`option`);
    male.innerText = `Male`;
    male.value = `male`;

    let female = document.createElement(`option`);
    female.innerText = `Female`;
    female.value = `female`;

    genderSelect.appendChild(defaultGender);
    genderSelect.appendChild(male);
    genderSelect.appendChild(female);


    body.appendChild(uiDiv);
    body.appendChild(usersDiv);
    uiDiv.appendChild(newUserHeading);
    uiDiv.appendChild(createUserForm);
    createUserForm.style.marginBottom = `20px`;
    uiDiv.appendChild(prevPageBtn);
    uiDiv.appendChild(nextPageBtn);
    createUserForm.appendChild(fNameInput);
    createUserForm.appendChild(lNameInput);
    createUserForm.appendChild(dobInput);
    createUserForm.appendChild(addressInput);
    createUserForm.appendChild(emailInput);
    createUserForm.appendChild(genderSelect);
    createUserForm.appendChild(confirmNewButton);

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

function genderChange() { // removes the default option from the select

    if (this[0].innerText == `Select Gender`) { this[0].style.display = `none`; }

};

// function createNewUser() {

//     let formData = Array.from({ length: this.parentNode.childNodes.length - 1 }, (a, b) => { return this.parentNode.childNodes[b] }),
//         reqData = {},
//         reqBody = ``,
//         requiredFields = [`first_name`, `last_name`, `email`, `gender`],
//         makeReq = true;

//     formData.forEach(elm => {

//         if (elm.localName == `input`) {

//             switch (elm.name) {

//                 case `first_name`:


//                     if (elm.value.trim() == ``) {

//                         alert(`You must enter a first name`);

//                     } else {

//                         reqData[elm.name] = elm.value.trim();

//                     }

//                     break;

//                 case `last_name`:

//                     if (elm.value.trim() == ``) {

//                         alert(`You must enter a last name`);

//                     } else {

//                         reqData[elm.name] = elm.value.trim();

//                     }

//                     break;

//                 case `dob`:

//                     if (elm.value != ``) {

//                         if (!dobRegEx.test(elm.value)) {

//                             alert(`Enter a valid date of birth`)

//                         } else { reqData[elm.name] = elm.value; }

//                     }

//                     break;

//                 case `address`:

//                     if (elm.value != ``) { reqData[elm.name] = elm.value; }

//                     break;

//                 case `email`:

//                     if (!emailRegEx.test(elm.value)) {

//                         alert(`You must enter a valid email`);

//                     } else {

//                         reqData[elm.name] = elm.value.replace(sanitizeEmail, `.`);

//                     }

//                     break;

//             }

//         }

//         if (elm.localName == `select`) {

//             if (elm.value != ``) {

//                 reqData[elm.name] = elm.value;

//                 let genderSelect = document.getElementById(`genderSelect`);
//                 genderSelect[0].style.display = `initial`;
//                 genderSelect.value = ``;

//             } else {

//                 alert(`You must select a gender`);
//                 return

//             }

//         }

//     });

//     requiredFields.forEach(item => { if (!reqData.hasOwnProperty(item)) { makeReq = false; } });

//     for (const k in reqData) { reqBody += `${k}=${reqData[k]} `; }

//     let userBody = reqBody.replace(/\s/g, `&`);
//     userBody = userBody.substr(0, userBody.length - 1);

//     if (makeReq == true) { createUser(userBody) }

// };

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
            nameDiv = createDiv({ class: `nameDivs` }),
            firstName = createHeading({ text: user.first_name, size: 3, class: `firstNames` }),
            lastName = createHeading({ text: user.last_name, size: 3, class: `lastNames` }),
            gender = createHeading({ text: user.gender, size: 3, class: `genders` }),
            dateOfBirth = createHeading({ text: `DoB: ${user.dob}`, size: 4, class: `dateOfBitrhs` }),
            address = createHeading({ text: user.address, size: 5, class: `addresses` }),
            email = createHeading({ text: user.email, size: 5, class: `emails` }),
            editButton = createButton({ text: `Edit User`, onClickFunc: editUser }),
            deleteButton = createButton({ text: `Delete User`, onClickFunc: deleteUser }),
            fNameInput = createInput({ type: `text`, class: `nameInputs`, pHolder: `New First Name`, name: `first_name` }),
            lNameInput = createInput({ type: `text`, class: `nameInputs`, pHolder: `New Last Name`, name: `last_name` }),
            dobInput = createInput({ type: `text`, class: `dobInputs`, pHolder: `New DoB YYYY-MM-DD`, name: `dob` }),
            addressInput = createInput({ type: `text`, class: `addressInputs`, pHolder: `New Address`, name: `address` }),
            emailInput = createInput({ type: `text`, class: `emailInputs`, pHolder: `New Email`, name: `email` }),
            confirmButton = createButton({ text: `Confirm`, onClickFunc: confirmEdit }),
            cancelButton = createButton({ text: `Cancel`, onClickFunc: cancelEdit });
        genderSelectUpdate = document.createElement(`select`);
        genderSelectUpdate.name = `gender`;
        genderSelectUpdate.onchange = genderChange;

        let defaultGender = document.createElement(`option`);
        defaultGender.innerText = `Select Gender`;
        defaultGender.value = ``;

        let male = document.createElement(`option`);
        male.innerText = `Male`;
        male.value = `male`;

        let female = document.createElement(`option`);
        female.innerText = `Female`;
        female.value = `female`;

        genderSelectUpdate.appendChild(defaultGender);
        genderSelectUpdate.appendChild(male);
        genderSelectUpdate.appendChild(female);

        // main divs for each user appended to parents
        usersDiv.appendChild(div);
        div.appendChild(displayDiv);
        div.appendChild(editDiv);

        // initial DOM layout
        displayDiv.appendChild(nameDiv);
        nameDiv.appendChild(firstName);
        nameDiv.style.marginTop = `15px`;
        firstName.style.display = `inline`;
        firstName.style.paddingRight = `2.5px`;
        nameDiv.appendChild(lastName);
        lastName.style.display = `inline`;
        lastName.style.paddingLeft = `2.5px`;
        //^ styling needed to have first and last name be next to each other, this way allows for easier change of innerText later in editing by user
        displayDiv.appendChild(gender);
        displayDiv.appendChild(dateOfBirth);
        displayDiv.appendChild(address);
        displayDiv.appendChild(email);
        displayDiv.appendChild(displayUiDiv);
        displayUiDiv.appendChild(editButton);
        displayUiDiv.appendChild(deleteButton);

        // appearance in a user edit mode
        editDiv.appendChild(fNameInput);
        editDiv.appendChild(lNameInput);
        editDiv.appendChild(genderSelectUpdate);
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

    // console.log(`Stored Pages`, storedData);
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

function confirmEdit() { // create a request body object filled with input data, call updateUserReq() with reqBody and userID as arguments, updates DOM

    let editDiv = this.parentNode.parentNode,
        userDivID = editDiv.parentNode.id,
        displayDiv = this.parentNode.parentNode.parentNode.childNodes[0],
        inputs = [],
        reqBody = {};

    editDiv.childNodes.forEach(child => {

        if (child.localName == 'input' || child.localName == 'select' && child.value.trim() != '') {

            switch (child.name) {

                case 'first_name':

                    if (child.value != '') {

                        reqBody[child.name] = child.value.trim();
                        inputs.push(child);

                    }

                    break;

                case 'last_name':

                    if (child.value != '') {

                        reqBody[child.name] = child.value.trim();
                        inputs.push(child);

                    }

                    break;

                case 'gender':

                    if (child.value != ``) {

                        reqBody[child.name] = child.value;
                        inputs.push(child);

                    }

                    break;

                case 'dob':

                    if (child.value != ``) {

                        if (!dobRegEx.test(child.value)) {

                            alert(`Enter a valid date of birth`)

                        } else {

                            reqBody[child.name] = child.value;
                            inputs.push(child);

                        }

                    }


                    break;

                case 'address':

                    if (child.value != '') {

                        reqBody[child.name] = child.value.trim();
                        inputs.push(child);

                    }

                    break;

                case 'email':

                    if (child.value != ``) {

                        if (!emailRegEx.test(child.value)) {

                            alert(`You must enter a valid email`);

                        } else {

                            reqBody[child.name] = child.value.replace(sanitizeEmail, `.`);
                            inputs.push(child);

                        }

                    }

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

function updateDOM(updated) { // uses the object data from the PATCH request to fill the DOM elements with the new data

    let displayDiv = document.getElementById(updated.divID).childNodes[0];

    for (const key in updated.data) {

        switch (key) {

            case `first_name`:

                displayDiv.childNodes[0].childNodes[0].innerText = updated.data[key].trim();

                break;

            case `last_name`:

                displayDiv.childNodes[0].childNodes[1].innerText = updated.data[key].trim();

                break;

            case `gender`:

                displayDiv.childNodes[1].innerText = updated.data[key];

                break;


            case `dob`:

                displayDiv.childNodes[2].innerText = updated.data[key].trim();

                break;


            case `address`:

                displayDiv.childNodes[3].innerText = updated.data[key].trim();

                break;


            case `email`:

                displayDiv.childNodes[4].innerText = updated.data[key].trim();

                break;

        }

    }

};

// vscode-fold=1