# MHWR
Collection of Monster Hunter information.
Connects to database and uses the data to display some information about the monsters onto the screen.
Only supports Monster Hunter World.

Front End - Vanilla JavaScript

Backend - API Layer REST

Database - MongoDB

Backend gets the data from MongoDB and then the frontend fetches the api call and uses the data to display information about the monsters onto the screen.
MongoDB only has a data for the images and the name of the monster.
Frontend still has another database connection from the Monster Hunter World API which has more detailed information on some of the monsters.

The database I created was with webscraping the monster hunter wiki for the images for each monster and their names.
