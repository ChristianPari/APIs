API used: GoRest API 'https://gorest.co.in/public-api/users'

This projects goal is to create a webpage with clickable pages that display user data. Then allow the current user to make edits or deletions of users stored on this webpage. This program utlizies the GET, PATCH, and DELETE request methods to actually make changes to the open source database from the GoRest API and is visbile on the website of GoRest.

<b>May 11, 2020</b>
6:00pm - 8:30pm
Started by creating the HTML file and sourcing my JavaScript files, I created a total of 3:
    * Index, will contain the brunt of the coding and functionallity
    * xhrReqs, will contain all the XHR functions to actually make the different requests needed for this webpage
    * htmlFuncs, will contain all my reusable HTML functions I use within all my projects
After all were created (only htmlFuncs could be filled for right now) I began creating the initial DOM layout within my index js file. Within the window onload method I created a div that will contain buttons the user will use to navigate page to page (this API gives users by page), and a div that will contain the user data collected and displayed from the API. After appending these to the body, I had to create the first API request (GET) so I went to the xhrReqs file and within a function created and the request. Realizing that this API utilizies pages for all there users, I had to implement a global currentPage variable that can be passed into the GET request so I can retrieve and use all the user data. So I think created the onClick functioms for the previous and next page buttons I created earlier which simply increment or decrement by 1 to the global currentPage variable and then I call the function that utilizes the GET request.