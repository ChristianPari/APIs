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

<b>May 2, 2020</b>>
3:15pm - 4:00pm
Added styling to get the current weather div and historical weather div on their own side of the page. Created functions that are assigned to the onclick property for each search button, and due to each API having different kinds of query parameters I did all the user input sanitizing within these functions to work for each API request. Within the onload property of the XHR I pass the parsed JSON data as an argument into a for specific function for each API request. The OpenWeather API only sends a single location as a response with its' weather information so the only function left is to display the data to the DOM. The Meteostat API however can have anywhere between 0 to multiple weather stations that we can receive from a users' search, so becuase of this I have to first pass the parsed response from this API request to a function that will filter out the amount of stations and inform the user of the outcome. Planning on if none were found then alerting the user to try anohter search local to that area, if there's only one found then have them confirm via a confrim box, then if there is more than one then create a way for the user to select which ever location they want and also a cancel button so they can go back and not follow through with the search.