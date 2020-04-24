First Weather API Project, started during class to go through and get an understanding of how to use the API and for help with creating code logic to sanitize user inputs so that errors wouldn't occur due to an invalid input. This is a simply webpage, has a title and then a user input box and search button. After the user inputs their desired location and clicks the button, the API request functions begins to run and checks that the user input is a possible valid input, otherwise will alert the user with a description of why their search didn't work and to retry, this also ends the API request so that the DOM isn't updated with 'undefined' data.

April 23, 2020 
6:00pm - 6:30pm
Began work with first weather API. This posed challenging due to the desire to use user input directly to get a weather. Initially created a function for when the window loads via windows' onload property, this function created the beginning HTML elements that I wanted displayed to the DOM: webpage heading appended to the body, a main div that will serve as a container for all information aside from the webpage heading which was also appended to the body, another div that serves as a interactive section for the input box and a get weather button I also created and this div was appended to the main div. `ALL HTML ELEMENTS WERE CREATED VIA REUSEABLE HTML FUNCTIONS THAT I WROTE WHEN FIRST STARTING TO USE HTML AND JS TOGEHTER AND CAN BE FOUND AT THE BOTTOM OF MY JS` 

6:45pm - 7:20pm
Created the XHR, the endpoint for now consisted of just a hard coded city so that I could see what data I would be working with and what could be used to display to the DOM. Inside the function for the onload property of my XHR I simply passed the parsed collected data into another function that would be used to actually create the rest of the DOM elements. Within said function I choose to create heading elements for the location, current temperature, today's high and low temperatures, the 'feels like' temperature and the humidity. I created a div to append all this information within and then appended this div to the main div. Once I knew that this worked so far I moved back to the API request function to create logic that will sanitize the user input.

7:35pm - 9:00pm
This last section took the most time due to having to work through all the possible logical errors that could occur via user input, also had to spend some time testing out regex's that would filter out any extra white space that was being inputed. Then used if statements to check in a logical order:
* (if) the input isn't a valid length for a city or zipcode (so less than 3 characters or more than 30 characters; found shortest city name is 3 letters, and couldn't find a city longer than 30 characters) alerts to the user the length specification.
* (else if) another that will alert the user if their input has a mixture of numbers and letters; as of now this program only runs with a zipcode input OR a city input, cannot handle both.
* (else if) a valid zipcode is entered (tested via condition that checks that there is no letters and only a 5 number input), this then assigns the specific url query parameter and its input to a query variable I created above the if statements.
* (else if) the input is a valid string then assign to the query variable its specified parameter and input.
* (else) which this would only run if the user doesn't input a 5 digit number and alerts to the user that they need to enter a valid zipcode
All the error-like if statements end with a return statement so that the API is not requested. For the other two if's, the gatherd query variable is assigned to the endpoint within the open property of the request.

AS OF NOW THIS CODE DOES NOT TAKE INTO CONSIDERATION FOR ZIPCODE LIKE INPUTS THAT DONT ACTUALLY EXIST, NOR DOES IT CLEAN THE DOM BEFORE GIVING THE INFORMATION FOR MULTIPLE LOCATIONS

April 24, 2020
2:10pm - 2:15pm
Made there be labels that are initially empty but once a location is searched for the weather appears next to the label, and ensured that if a new search is made that the previous data is deleted and the new info is assigned.

2:15pm - 2:30pm
Created if statments within the API request that if the code received isn't 200 (ok) then don't run the function that fills the DOM with weather data because it would be undefined because the searched location doesnt exist if the code isn't 200.

2:30pm - 3:30pm
Spent time testing and ensuring no errors would occur. Added CSS to help display look a little better, nothing crazy.