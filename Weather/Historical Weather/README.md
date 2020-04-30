<b>April 28, 2020</b>
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

7:45pm - 8:00pm
Created the XHR for what the user inputs. Created a new instance of XHR and assigned it to a variable (xhr), then assigned my endpoint to a variable named endpoint; both will be used in the xhr open property method to initialize the call. Then inside the onload function I simply parse the data that's retrived from the API and pass that parsed data as a argument into a function that filters the weather station data. `ORIGINALLY PLANNED ALL THE CODE TO BE WITHIN THE ONLOAD FUNCTION BUT IT GOT TOO LONG SO I CREATED A FUNCTION SPECIFICALLY FOR FILTERING THE STATIONS FOR THE USER`

8:00PM - 8:45PM
After looking through the API response data I knew that I would be working with an array of data. This arrays minimum length could be 0 which would mean that there were no weather stations found with the inputted name from the user and then there could be 1 or numerous locations with the name from the user. So I used if statements to work through the possibilites.
* First 'if' is for an array length of 0 simply alert the user that there were no results and to try another name.
* If length cameback 1 then there was only 1 station found so I wanted the user to be able to confirm this location so by using the confirm method to inform the user of the location, if they wish to proceed then click 'ok' and otherwise 'cancel'. I set this method to a variable and within an if statement I said if the variable is true (user clicked ok) then run the function that will actually run another API request for that specific station (different endpoint url), and if they clicked cancel then simply return and do nothing which allows the user to go back and change their input.
* Then if the length cameback as more than 1 then this means more than one weather station was retrieved from the first API request and I wanted the user to be able to choose from these options so I created a new select element within this if statement and assigned the options the value of the station id that is needed for the second API request that actually retrieves the weather data for that station. I also created a cancel button so the user can go back and input a new location if none of the results were what they wanted.

8:45pm - 9:00pm
Created the cancel button on click function that simply just hides the weather station select object and the cancel button with a display property assigned the value of 'none'

<b>April 29, 2020</b>
6:00pm - 7:45pm
Created a function that takes in both the weather stations information object and the weather data object for that station as arguments, this function will be used to display the weather data to the DOM. I needed the station information object because I wanted access to the Name and Country of the user's choosen weather station, this way I could then display that to the DOM along with the weather data gathered from the API request. Within this function I created the following elements and appended them to the weather div I created in the onload property method at the beginning of the JS file.
"ALL HEADING ELEMENTS"
* Station Name and Country Code
* Average Temperature
* High Temperature
* Low Temperature
* Rainfall Total
* Length of Sunshine in Hours
* Wind Direction
* Max Wind Speed
* Max Wind Gusts
* Snowfall Total
* Snow Depth
Although due to how this API responds; their data objects may come in with a value of null, if this is the case, I used a ternary operator method within the set text protion of my create heading functions that will assign a empty string as it's innerHTML value if the specified key has a value of null.