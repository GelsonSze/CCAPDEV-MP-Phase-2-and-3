# CCAPDEV MP Phase 2 & 3 - Glitch
About our webpage:

    Glitch is a game library management web application that allows users to create their 
    accounts in which they can explore games from the general game library, add and favorite
    games to their own game library, comment and rate on certain games, and interact with 
    other users by searching them and checking their game libraries.

When downloading the repository, the folder should contain these folders alongside their respective files:

    
    [controllers] - The folder contains files which define callback functions for client 
                    requests.      
    [models] - This folder contains files for database modeling and access.
    [public] - This folder contains static assets such as css, js, adn image files.
    [routes] - This folder contains files which describe the response of the server for 
             each HTTP method request to a specific path in the server.
    [views] - This folder contains all hbs files to be rendered when requested from the server.
    [index.js] - The main entry point of the web application.

The packages used in this project includes:

    "bcryptjs": "^2.4.3",
    "body-parser": "^1.19.0",
    "connect-mongo": "^4.6.0",
    "dotenv": "^16.0.1",
    "express": "^4.18.1",
    "express-fileupload": "^1.4.0",
    "express-session": "^1.17.3",
    "hbs": "^4.2.0",
    "mongoose": "^5.12.7"

## For Local Set Up

To deploy this project locally,
```bash
  Make sure MongoDB is installed and running
```
After installation, run these in the command prompt of the designated repository folder after downloading the contents of the repository
```bash
  1. npm install
  2. node index.js
```
Once the server is up and running, the command prompt should display the following statements:
```
Server is running at:
http://localhost:3000
Connected to: mongodb://localhost:27017/ccapdev-mp2
```
To test the web application, proceed to this link to access the web application
```
http://localhost:3000/
```
## To access this program online, please head to this heroku deployment link:
```
https://ccapdevmp-esu.herokuapp.com/
```


## Group Members

- Janielle Shane Enriquez
- Gelson  Sze 
- Sean Henrick Umpad 

