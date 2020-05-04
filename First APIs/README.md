This is a folder containing my progress and development as I learn about API's.

MAJOR STEPS WHEN USING XHR:
1) CREATE THE XHR OBJECT
* this consists of creating a variable (I usually use `xhr`) and then assigning to it a `new` instance of XMLHttpRequest(): let xhr = new XMLHttpRequest();
2) OPEN THE CHANNEL FOR THE REQUEST
* this is when you create the open() function call, params used are REQUEST METHOD, ENDPOINT, ASYNC true or false.
* I usualy create varaibles to store this info first and then pass them in as params: <br> * let reqMeth = 'GET', ep = 'apiURL.here', async = true; <br> * xhr.open(reqMeth, ep, async);
3) A FUNCTION RUNS WHEN THE RESPONSE HAS BEEN RECIEVED FROM THE SERVER
* create the onload() function
4) FINALIZES THE 'OPEN' METHOD AND SENDS DATA ALONG WITH THE REQUEST WHEN NEEDED
* never forget to create the send() function

Short summary of each folders contents:
* FirstXHR folder:
    - My first walkthrough and code using APIs via XHR. Learned the basics of XHR and how to use it correctly (the steps mentioned above). Created a simple DOM display with HEADINGs, IMAGEs, and HREF LINKs created from the user data recieved from the API.

* SecondXHR folder:
    - Similar to the first folder, I created a simple DOM layout with a little more CSS to organize and style each user's DIV that's displaying their data. This program contains DIVs, many HEADINGs, and HREF LINKs to display the data.

* ThirdXHR folder:
    - Created a slightly more complex DOM layout using CSS Grid to create a 4 coloumn boxed layout to display user data. This program I used HEADINGs, IMAGEs, HREF LINKs, and BUTTONs; BUTTONs are used to show and hide more information on each user.

* FourthXHR folder:
    - Created what I would call a simple 'Company Resource Site' where a user would go and look at companys that they could hire. This being more simple where the DOM displays DIVs filled with (fake) company information and BUTTONs that allow the user to add each one to the 'interested in' SIDEBAR and then another BUTTON that would remove that company from the sidebar.This program uses DIVs, HEADINGs, HREF LINKs, BUTTONs. DOM is organized via CSS Grid within the DIV containing the company DIVs,and Flexbox to get the SIDEBAR located on the right side. 

* Two APIs:
    - First walkthrough using more than one API at once. This was interesting, having to begin getting an understanding on SYNCHRONOUS and ASYNCHRONOUS which I did gain the basic knowledge of it but will spend more time researching. This program used an API to gather IMAGE LINKs that would be used as profile pictures for the second APIs user data. Using CSS Grid I gave the DOM a 4 column layout to display the data. HTML ELEMENTS used were: DIVs, HEADINGs, IMAGEs, HREF LINKs.