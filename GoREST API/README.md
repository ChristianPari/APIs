API used:
GoRest API 'https://gorest.co.in/public-api/users'

This projects goal is to create a webpage with clickable pages that display user data. Then allow the current user to make edits or deletions of users stored on this webpage. This program utlizies the GET, PATCH, and DELETE request methods to actually make changes to the open source database from the GoRest API and is visbile on the website of GoRest.

<h3>May 11, 2020</h3>
6:00pm - 8:30pm<br>
Started by creating the HTML file and sourcing my JavaScript files, I created a total of 3:
    * Index, will contain the brunt of the coding and functionallity
    * xhrReqs, will contain all the XHR functions to actually make the different requests needed for this webpage
    * htmlFuncs, will contain all my reusable HTML functions I use within all my projects
After all were created (only htmlFuncs could be filled for right now) I began creating the initial DOM layout within my index js file. Within the window onload method I created a div that will contain buttons the user will use to navigate page to page (this API gives users by page), and a div that will contain the user data collected and displayed from the API. After appending these to the body, I had to create the first API request (GET) so I went to the xhrReqs file and within a function created and the request. Realizing that this API utilizies pages for all there users, I had to implement a global currentPage variable that can be passed into the GET request so I can retrieve and use all the user data. So I created the onClick functions for the previous and next page buttons I created earlier which simply increment or decrement by 1 to the global currentPage variable and then I call the function that utilizes the GET request and have the currentPage as an parameter within this function call.<br>
Within this function (named reqUsers) I make the GET request using XHR and within my endpoint I use the pageNum argument for the data of the query parameter. Then once the data is retrieved from the API in the onload method, I pass the array of all the users of that page as a paramtere into a function that will actaully display the data to the DOM (displayUsers()). Also upon realizing I'm allowing the user to decrement the pages, I needed a last page variable and thankfully this API actaully gives us this information in the META object of the request and so everytime this reqUsers function is called the lastPage variable is updated with the last page property value from the API (this data changes frequently since anyone can edit users on the GoRest webpage).<br>
Now within the displayUsers function I want to ensure that the DOM only displays the correct data for each page being recieved from the API so I clear the usersDiv (does/will contain all the data to display the users) initially each time this function is called. Then the page heading is created which just informs the user of what page they are viewing. Then using a forEach loop to access each index of the users array argument I created:
* A main user div, contains everything for the user and is assigned the user ID that is given from the API (this is needed to edit or delete the user from the database)
* A displayDiv, will be visible initially and will contain the following elements/data:
    - ALL VIA HEADING ELMS: users name, date of birth, address, and email
    - a UI div containing: a delete button and edit button
* A editDiv, will initially be hidden from the user until they click on the edit button for a specified user, this contains:
    - ALL VIA INPUT ELMS: first name, last name, date of birth, address, email
    - a UI div containing: a cancel button and confrim button

<h3>May 12, 2020</h3>
5:30pm - 8:30pm<br>
I realized that each time the user changes the page a GET request is being made and not that it's extremely noticeable but there is a small delay each time, so I created a way for each entire page of data to be stored during the users current session (without a page refresh) so that when the user switches to a page that was already shown the webpage will extract the data from where it is stored and display it to the DOM a little bit faster. I did this by creating a global object called storedData and left it empty. Then within the displayUsers function I created an empty array variable that will store each users data that is being used to display on the DOM by pushing that user object to the empty array variable (pageData). Then after all the DOM creation is done and at the end of this function I use bracket notation to create a new key/value pair for the storedData global object, the key will be 'page${currentPage}' and the value is the array that was just created within this function.