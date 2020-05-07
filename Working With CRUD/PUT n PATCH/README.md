First project working with methods other than the GET method. This projects overview is to create a webpage that has fake user posts (data gathered from the JSON Placeholder API) and then allow the user to make edits to the posts via form input boxes and then when they click the submit button, the code I will have written will determine weather to make a PUT or a PATCH request and edit or create a post.

<b>May 6, 2020</b>
11:45am - 3:15pm
Inside my HTML file I created:
* a heading for the webpage
* a div which contains a form:
    - which contians 4 inputs and a submit button
    - the 4 inputs are:
        - title
        - body
        - userId
        - postId
All will be used to edit the posts that will be displayed on the DOM.
Then following this I created an empty div that will contain the posts.

`ALL CODE BELOW IS WRITTEN IN MY INDEX.JS FILE`
Created a window onload function that uses a GET request to gather fake posts from the JSON Placeholder API, its an array of 100 post objects so I used a for loop to just gather the first 10 and then I pushed those posts into another array that I then passed as an argument into a function that will create the DOM displays for these posts. Within this function I created:
`AT THIS POINT I MADE A SECOND JS FILE TO STORE MY FUNCTIONS THAT I USED TO CREATE HTML ELEMENTS`
* a div for the post
* a heading elm for the users id
* a heading elm for the title of the post
* a body elm for the posts body
* a heading to display the post #
After these are created the div is appeneded to the main div I created in my HTML file.

Then I created a function that will be used to compile the form data from the user inputs. I want the user to have to enter a post id that they wanted to edit and made sure; using an if statement, that the value entered wasn't an empty string or a string or a number smaller or larger than what was allowed. Then the other fields were confirmed as the correct inputs by using a 'for of loop' to check the inputs 'type' and name to ensure that they weren't the postId input. Then I create object properties for an empty object using the input data. This was necessary because the API request methods being used are the PUT and PATCH and I want to only use the PUT request if all the fields are being editied in a post, otherwise, use the PATCH request. So by comparing the length of the created object to the length of the form (subtracted by 2 because I didn't want to include the submit button or postId input), I can use if statements to make a function call that passes the string 'PATCH' or 'PUT' to be used within the XHR later.

Once this information is passed into the function that I will use to make the API request, I assign the method to the XHR open method so that the correct request method is being made. Then to edit the DOM, witi=hin the XHR onload method I use a switch statment for the possible names of the elements I created earlier and use the replaceChild method to assign the new created data to the corresponding div.

<b>May 7, 2020</b>
8:45am - 9:15am
Added some simple styling to clean things up, and look nicer to me.
