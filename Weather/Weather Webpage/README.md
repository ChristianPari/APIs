<b>May 1, 2020</b>
7:00pm - 8:00pm
Created the HTML and used script tags to source my JavaScript into the HTML file. I created 3 JS files for this project:
1) A whole file of functions that are used to create HTML elements
    * I created this file to store all the functions that I use throughout all my projects; I reuse this file (modified when needed for this project)
2) Another that stores functions that create and fill select elements that the user interacts with to select a date
    * This file was created to be reused with projects that handled date selection via select elements (modified when needed for this project)
3) The third and final JS file contains the brunt of my code; this consists of the creation of the DOM along with maiuplating and using the XMLHttpRequest Data that I receieved from the API:
    * The timestamps below will contain the work for this JS file

Created initial DOM elements:
* Title - appended to body
* A main div to place the following elements within - appended to body
* Divs for current weather search and historical weather search - appended to main div
* Divs for the UI and Weather Data Display for both above divs - appended to respective search div
* Input boxes - appended to respective UI div
* Search buttons - appended to respective UI div
* Select elements - appended to historical weather UI div

8:00pm - 9:00pm
Had to rework my previosuly created date selection JavaScript file due to the way I want the UI to be displayed and want the functionallity to work. The logic for the user to be able to select a year month and day while keeping all select elements appearing on screen so that they can change anyone whenever they wish. The data within each changes when the one previous changes so when they select a year they are then allowed to select a month because it was then filled with the correct data, and so on when they select a month.