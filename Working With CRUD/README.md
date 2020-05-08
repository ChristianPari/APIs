These folders are simple like projects that I was assigned to get practice with using the different API request methods; below are descriptions of each folder.
* PUT n PATCH
    - API used: JSON Placeholder (posts)
    - This was my first project using these requests, the goal was to make a webpage that would allow the user to edit posts that are on the webpage which would change the data in the database by either a PUT or PATCH (which depended on if the user changed all feilds or just some).

* PUT PATCH DELETE
    - API used: JSON Placeholder (posts)
    - This was my first project using all three of these requests, the goal was to make a webpage that allowed the user to cycle through all the posts from 10 users stored in the API and the allow the user to edit or delete the post from the webpage. Since this is a fake database from JSON Placeholder, I made 2 types of temporary delete storages; 1 via an array of objects within my JS that stores the data from the deleted nodes, and the other is to store the data in session storage; both allowed for the posts to remain deleted for each session. Then by using the edit button allows the user to change the selected posts data or cancel and leave it unchanged.