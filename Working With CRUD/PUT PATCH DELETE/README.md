API used: JSON Placeholder POSTS

<b>May 7, 2020</b>
5:30pm - 6:30pm
Created the HTML file and linked my JS files, I created and stored my reuseable HTML functions that I use to create HTML elements from within JS. Then created my main index JS file, within here I just created an unassigned global variable that will be used to store all the posts from the API that I will be using. Then within a window onload method I created a UI div that will contain the buttons (prevUser and nextUser; created but haven't made onClickFunctions yet) that will allow the user to cycle forward and backwards through each users posts; the APIs response contains 100 posts from 10 users, so I figured I'd setup the webpage for the user to view each users 10 posts. Then another div for the actual posts data that'll be displayed, then finally a function call to actually request the posts data from the API.
The request posts function creates a GET request using XHR and once the data is parsed I assigned it to the allPosts variable so now I can access this array of objects from anywhere in my code.

6:45pm - 7:45pm
I realized I needed a way to have my code know which user it is on and that once it reaches the last user to restart from the first and vice versa so I created a global viewingUser variable that has an initial value of 1 because I want the webpage to start out showing user 1's posts. So within my buttons onclick functions I used a ternary operator to assign the value of the viewingUser variable +1 or -1 on each click or if it's value is 10 or 1 while adding or subtracting respectively then start at either the beginning (1) or the end (10).
Then I created the function to actually display the posts to the DOM. This function is going to be called with each buttons onclick function and also when the webpage first loads (but stored within the request posts function). So first I clear the postsDivs' innerHTML and then I crated the main heading for the div which displays which users' posts are being displayed, then by using an if statement within a forEach loop of the allPosts array I check to see if any of the objects userID matches the viewingUser variable value; if yes then within the code block I create:
    * a div for the post
    * the UI for the post that will contain:
        - delete button
        - edit button
    * the post title as a heading
    * the post body as a paragraph
I then appened all these elements to their respective parent nodes and then the whole div to the postsDiv.
I did some testing to ensure that the functionallity so far did what I desired of it.

8:00pm - 9:30pm
Next was to actually start creating the functionallity for the delete and edit buttons, I started with the delete button. So the goal for this button was to remove the post from the DOM as well as the (fake) database of the API. So I created the DELETE XHR request but this API doesn't actually give you any sort of confirmation or respond with what data was deleted so I had to ensure of the 'temporary deletion' somehow which made me think of creating a global variable that will store the nodes that are deleted. So after the XHR request I push the node to the array and then use the remove method to remove the div from the div entirely. I had to then go back into the displayPosts function to ensure that any deleted posts won't be recreated when switching bewteen users since this function is called each time. So I created a if statement that checks for the length of the deletedPosts array and if it isn't 0 then with the use of the forEach loop I nest one for the allPosts array inside the one of the deletedPosts one, and then used an if statement to compare all the post IDs with the deleted ones and if any match then to find the index of thay post within allPosts and remove it via the splice method. Now the deleted posts will not be recreated and there is a temporary deletion process of the webpage. (I also created another way to do this using session storage and then comparing the posts that are being created to the session storage by seeing if the post ID was stored within the session storage and if so then to not create that post).

<b>May 9, 2020</b>
4:00pm - 4:15pm
Changed the input boxes for editing the title and body in the form to text area boxes. Started adding styling, made the whole body element centered on the DOM and will start styling elements next.

4:30pm - 5:45pm
Ran into some issues when trying to compare the value of the textarea inputs with the innerText of the title and body elements, for some reason there were hidden new line "\n" characters within the text causing them to not be equal when compared. It took me a while and lots of researching to find out that the hidden new lines were the actual issue but then realizing it after I used RegEx to replace all whitespace with a single space, then after a lot of testing found it to work perfectly! So then reworked my functionallity of the confirm button, so now the user gets a confrim alert if they don't change anything and if they click okay then the text returns to its normal state. If the user changes one then a PATCH request is made, and if both are changed then a PUT request is made.

<b>May 11, 2020</b>
8:20 am - 8:50am
Added some CSS to brighten up the webpage, colors and border styles, edited the textareas so they'd have the same font as everything else.