<div id='beg'></div>
This being my second go with using an API I was instructed to use a different one then the first.

<a href="#demo">Click here to view demo</a>

API used:
* https://jsonplaceholder.typicode.com/users

In this program I first created a new INSTANCE of an XHR, this was done by assigning a VARIABLE to 'new XMLHttpRequest();'. Then I created the first METHOD with that VARIABLE; .open METHOD, I created VARIABLES for the following mandatory PARAMETERS and assigned the values to them that way I would get used to what each PARAMETER is called and used for.

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

Then I created the function that will take in the user data as an ARGUMENT that way I could access the KEY/VALUE pairs to create HTML ELEMENTS for each user.
I created:
* a DIV which is APPENDED to the BODY; will be used to display the ELEMENTS for each user
* a HEADING for the following pieces of data:
    - user's name
    - user's company name
    - company's catch phrase
    - company's address
    - the user's email address
    - the user's phone number
* a HREF LINK to the company's website

Located at the bottom of my code are pre-made functions for creating HTML ELEMENTS where I pass an OBJECT as a PARAMTER with info like ID, CLASS, TEXT, ect. that are used to make my HTML ELEMENTS.

<a href="#beg">Back to top</a>
<div id="demo">
https://user-images.githubusercontent.com/62902638/79371078-c7be3080-7f21-11ea-9283-651ed8e09bee.gif
</div>

