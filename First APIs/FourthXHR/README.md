This is my fourth attempt at using an API to GET information on users and display their information on the DOM.

API used:
* https://jsonplaceholder.typicode.com/users

Started code with a WINDOW ONLOAD METHOD in which I created a title HEADING, and 3 DIVs; the main DIV contains a DIV that displays the users info and a DIV for the sidebar.
Used CSS Grid and Flexbox to create a 2 coloumn layout with a sidebar.

After creating HTML ELEMENTS, a function is called that requests all the users data from the API. Within this function I setup a XHR using the stated API as the ENDPOINT. Within the ONLOAD METHOD I used a FOR LOOP to ITERATE through the PARSED data and then pass each user OBJECT through as a PARAMETER into a thir function.

Within this third function I created DIVs for each user and appended them to the main DIV.
Each DIV has the user's:
`ALL DATA IS MADE UP VIA JSON PLACEHOLDER API; SOME WEBSITES MAY BE NOT FOUND OR NON-EXISTANT`
- HEADING; company name
- HEADING; company business slogan
- HEADING; the CEO's name
- a LINK to google maps with their location inputed ready for dircetions to that locations via Lat. Lon.; opens in new tab
- a LINK to their companys website; opens in new tab
- a BUTTON that'll add that company to the sidebar as a "interested in" company; display is set to none after ONCLICK
- a BUTTON that'll removes tha company from the sidebar; appears after previous BUTTON is clicked, display also is set to none after ONCLICK
- a BUTTON that creates an ALERT on the users screen with contact information about each company; phone number, email address, mailing address

When it came to the point of making the ONCLICK function I realized that I would need to ensure that when that BUTTON was clicked that the correct data was being used. So I decided to create antoher function that would use the clicked BUTTONs ID (needed to use RegEx here because each BUTTONs ID contained the same number but was followed by a different text) as end portion of the API to get a specific users data as an ENDPOINT.

Once acheived I then used a SWITCH STATEMENT within the ONLOAD FUNCTION where each case was a BUTTONs specific ID, where then it would call a certain function with that specific users data as a PARAMETER.

The contact display BUTTON showed the phone number, email address, and mailing address.

The 'interested in' BUTTON simply adds a HEADING with the companys name to the sidebar.

the 'not-interested' BUTTON simply removes the created HEADING entirely from the DOM.

`demo soon`