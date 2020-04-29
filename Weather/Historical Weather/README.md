<b>April 27, 2020</b>
5:30pm - 6:00pm
Created the HTML and used script tags to source my JavaScript into the HTML file. I created 3 JS files for this project:
1) A whole file of functions that are used to create HTML elements
    * I created this file to store all the functions that I use throughout all my projects; I reuse this file (modified when needed for this project)
2) Another that stores functions that create and fill select elements that the user interacts with to select a date
    * This file was created to be reused with projects that handled date selection via select elements (modified when needed for this project)
3) The third and final JS file contains the brunt of my code; this consists of the creation of the DOM along with maiuplating and using the XMLHttpRequest Data that I receieved from the API:
    * The timestamps below will contain the work for this JS file

6:30pm - 7:00pm
Created the first function which is assigned to the window onload property, this creates the initial elements that will be displayed to the DOM. These elements include:
* A heading for the webpage
* 3 divs:
    * 1 for the UI; button, input, select elements 
    * 1 to display the gathered weather data from the API to the DOM
    * 1 for the copyright documentation from this API
* UI elements:
    * a submit button that's used to call the API request via onclick; display is assigned 'none' until changed after user input sanitization
    * an input box for the user to type in a location
    * select elements (starts with year; then once changed continues to month and then day and stores data in a object within the date-selection.js file)
* After it's creation function, I gave the input box a onkeyup property that is assigned to a function that sanitizes the users' input before making the submit button appear in the div.
* Lastly, I appended the elements to their respective parent nodes.

7:30pm - 8:00pm
Created the XHR for what the user inputs. Created a new instance of XHR and assigned it to a variable (xhr), then assigned my endpoint to a variable named endpoint; both will be used in the xhr open property method to initialize the call. Then inside the onload function I simply parse the data that's retrived from the API and pass that parsed data as a argument into a function that filters the weather station data. `ORIGINALLY HAD ALL THE CODE WITHIN THE ONLOAD FUNCTION BUT IT GOT TOO LONG SO I CREATED A FUNCTION SPECIFICALLY FOR FILTERING THE STATIONS FOR THE USER`