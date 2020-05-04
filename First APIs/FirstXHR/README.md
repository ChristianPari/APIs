<div id='beg'></div>
This is my very first attempt with using APIs, this code was a walkthrough to learn the basics of using XMLHttpRequest (XHR).

<a href="#demo">Click here to view demo</a>

API used:
* https://api.github.com/users

This program was created entirely inside of an HTML file using SCRIPT tags to write JS. First I was informed to create a new INSTANCE of an XHR, this was done by assigning a VARIABLE to 'new XMLHttpRequest();'. Then I created the first METHOD with that VARIABLE; .open() where I learned a basic understanding of each manadatory PARAMETER that this METHOD takes.
* REQUEST METHOD:
    - 'GET' (this is the only one I worked with so far): retrieves data from the specified resource
* ENDPOINT (API URL):
    - the URL in which the API being used can be reached
* ASYNCHRONOUS BOOLEAN:
    - Can't say I have a dynamic understanding of this yet but the jist of what I retianed is:
        - when FALSE (SYNCHRONOUS: old school way of how websites used be ran), the website will load and run code one line at a time and wait for each process to be finsihed before continuing onto the next process.
        - when TRUE (ASYNCHRONOUS: new school and allows websites to load extremely fast compared to previous method), the wesbite will load and run code in a multi-tasking type of way and will not wait for a previous process to complete before continuing on to the next process.

Then I created the ONLOAD METHOD which I was then shown how to extract the RAW data via .responseText, and then how to PARSE this data via the JSON object and it's PARSE METHOD. The RAW DATA cannot be manipulated within code/the programmer cannot access the data within it, this is why we PARSE it via the JSON OBJECT to make the data appear to us as an OBJECT which we can then access and use to manipulate our code according to our liking.

Before mentioning more of the ONLOAD METHOD, I must say that I place the SEND METHOD directly after the ONLOAD code block. I know this is only used to send data back to the API although it is neccessary to have in our code when using the XHR way of using APIs.

Using a FOR LOOP within this ONLOAD METHOD we are able to pass through as a PARAMETER to a displayUser function to then create HTML ELEMENTS to display the user data to the DOM. Within this function I created:
* a DIV for each user that'll be used to display each users ELEMETNS
* a HEADING ELEMENT that displays the users username
* an IMAGE ELEMENT that displays their profile picture
* followed by a HREF LINK to their GitHub home page
Finsihed by APPENDING these to their PARENT NODES; DIV to BODY, rest of ELEMENTS to DIV.
Added some INLINE CSS within the SCRIPT tag to display the data more nicely.

Located at the bottom of my code are pre-made functions for creating HTML ELEMENTS where I pass an OBJECT as a PARAMTER with info like ID, CLASS, TEXT, ect. that are used to make my HTML ELEMENTS.

<a href="#beg">Back to top</a>
<div id="demo">
https://user-images.githubusercontent.com/62902638/79371050-bb39d800-7f21-11ea-81ba-6bf3d254dc61.gif
</div>