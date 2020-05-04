<div id='beg'></div>
This is my third go around with using APIs and I am using the GitHub user API once again. Instead of doing all my code within a HTML file I swithced to just creating a base HTML file with my SCRIPT SRC info and my CSS LINK.

<a href="#demo">Click here to view demo</a>

API used:
* https://api.github.com/users

With this program being mostly in my JS file (created a DIV in the HTML to APPEND children to later in JS), I used a WINDOW.ONLOAD function to that contains all the XHR coding; OPEN ONLOAD and SEND. In this function I simply gathered the data and then created a FOR LOOP to ITERATE through the PARSED RESPONSE since the RESPONSE was an ARRAY of OBJECTS, and then have each INDEX of that PARSED RESPONSE passed as a PARAMETER into another function call within this FOR LOOP to display the user data to the DOM.

The user display function was used to CREATE and APPEND HTML ELEMENTS to the DOM. The ELEMENTS created are:
* a DIV designated for the user and within this DIV:
    - username
    - profile pic
    - a LINK to their GitHub
    - a BUTTON that will via ONCLICK:
        - assign itself a display of NONE
        - display how many followers the user has
        - display how many users the user is following
        - the users number of GitHub Repos
        - assign the following BUTTON a display of INITIAL
    - a seond BUTTON that will via ONCLICK:
        - assign itself a display of NONE
        - assign the first BUTTON a display of INITIAL
        - hide the information created by the first BUTTON

<a href="#beg">Back to top</a>
<div id="demo">
https://user-images.githubusercontent.com/62902638/79371098-d278c580-7f21-11ea-9a27-df564c73b3c1.gif
</div>