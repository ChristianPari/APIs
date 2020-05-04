This is my first attemp at using more than one API endpoint within one JS file.

APIs used:
* https://dog.ceo/api/breed/husky/images/random
* https://jsonplaceholder.typicode.com/users

What I learned using two APIs at once?
- How you need to manage the ASYNCHRONOUS aspect of coding; making sure all data loads and is received before it's attempting to be used within the code.
- http:// is neccessary when trying to use a website link of an outsource directory

Code starts via WINDOW ONLOAD method where I create a main DIV that I use to display all the data I receive from these APIs.

Create the first XHR setup with the dog.ceo API; this API was used to gather random dog pictures to use as company IMAGES. I used a IF STATEMENT as a way to confirm that all the data from the first API has been collected before moving on to the next portion of code; I created an ARRAY to store the picture LINKS as the ONLOAD method is being re-ran in a WHILE LOOP to gather the amount of IMAGES needed for this program.

Once completed, a function is called that takes the ARRAY as a PARAMETER so it can be used to assign IMAGES to each user. Inside this function I create another XHR where I used the second API as the endpoint to gather the users data. Within the ONLOAD method I used a FOR LOOP so I could access each user and their corresponding IMAGE and pass them through as PARAMETERS into a final function that'll create the DOM elements.

Within that function I created DIVs for each user and appended them to the main DIV.
Each DIV has the user's:
`ALL DATA IS MADE UP VIA JSON PLACEHOLDER API; SOME WEBSITES MAY BE NOT FOUND OR NON-EXISTANT`
- HEADING; company name
- HEADING; company business slogan
- HEADING; the CEO's name
- a IMG w/ a Husky as a company picture
- a LINK to google maps with their location inputed ready for dircetions to that location via latitude and longitude; opens in new tab
- a LINK to their companys website; opens in new tab

`demo soon`