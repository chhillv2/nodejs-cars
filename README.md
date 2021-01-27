# nodejs-cars There are two folders: 1) server 2) client
1. Run the below commands for both client side as well as server side

npm i 
npm start

Server side code will run on 3000 by default and please run client side on some other port. 
The server code can also be run by:

# node app.js "name of command which is defined in app.js file in server folder"

# Docker
docker build -t <your username>/node-web-app .
docker images

example ==> docker run -p 49160:8080 -d <your username>/node-web-app

# Enter the container
docker exec -it <container id> /bin/bash

