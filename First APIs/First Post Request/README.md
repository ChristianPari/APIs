<b>May 4, 2020</b>
5:30pm - 8:30pm

* POST
    - POST is the HTTP method that is designed to send loads of data to a server from a specified resource.
    - This method allows data to be sent as a package in a separate communication with the processing script.
    - POST request can be used to submit a web form or upload a file, but it is critical to ensure that the receiving application resonates with the format being used.
    - The Content-Type header indicates the type of body in the POST request.

As a class we walked through the fundamentals of how to use and create a POST request. We created a form element and simply made some input elements and a submit button to test the XHR request after sanitizing user input. Created a body object that we would assign the data gathered from the input elements values, stored them as key/value pairs and then passed as an argument into the function that holds the XHR.