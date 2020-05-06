<b>Mat 5, 2020</b>
5:30pm - 6:30pm
Understaning difference between PUT and PATCH

* PUT
    - a method of modifying resource where the client sends data that updates the entire resource.
    - it is used to set an entity’s information completely.
    - overwrites the entire entity if it already exists, and creates a new resource if it doesn’t exist.

* PATCH
    - a method of modifying resource where the client sends data that updates the key/value pairs within a resource.
    - it can overwrite a value of a key, and can create a new key/value pair if it doesn't already exist.

6:30pm - 8:30pm
Created a program that allows for a user to create a post with the properties: title, body, user id, post id. The API request will not run if the user does not enter a post id to be altered, and it also will not call the API request unless at least 1 of the fields are filled out. Then depending on how many fields are filled out with determine which API request method will be used:
* if not all the fields are filled but at least 1 is then the function used to gather the info from the input boxes will send the data, 'PATCH' , and the post id as key/value pairs in a object...
* if all the fields are filled out the the function used to gather the info from the input boxes will send the data, 'PUT', and the post id as key/value pairs in a object...
and then this object is passed as an argument to then be used to create the API call with the specific method being used.