This folder will consist of all API projects using Weather APIs, below will be a short description of each folder above.

* Current City Weather v1
API source: OpenWeather
First project using a weather API and integrating user input. Displays to the DOM current weather conditions for that searched for area, along with a weather condition icon and a background for the div that is the container for the weather condition information; the background corresponds to the weather of that area as well.

* Historical Weather
API source: Meteostat
A webpage that allows a user to search for a location (only gives data via local weather stations in certain areas, not all specific locations have a weather station so user have to decipher if the weather station that is going to be used is in their area) via input and select a date in history within the 2000s (due to the limitation in data from this API). The weather data then displays to the user on the DOM with all information that was gathered from the API request (this API doesn't always give the same data for each weather station).

* Weather Webpage
API sources:
    * OpenWeather - for current date weather data
    * Meteostat - for historical weather data
    * RESTCountries - for country data
This projects goal was to allow a user to search for location based weather data from the current date to the near past (Meteostat data is very mixed with years but most recent years have more data for more locations) and compare locations. There are two sides of this webpage; one assigned to the current weather data and the other the historical weather data.