# door2door

In This task we provide a solution for drivers at door2door to enable them to register, deregister and send their updated location.

### Technologies:

- The App is implemented using Javasript and the server using node and express to create 
- Mongo used for the database.
- Socket.IO is used for broadcasting the user location.

### Tests:

Unit tests are inplemented to test the service, register, deregister and update location.

### Driver lifecycle

Driver first register with uniqe id, then sends update locations with latitude and longitude, the driver must be in the zone of berlin. and the driver can deregister from the server.

### Database

Two models are created one for the vehicle and other one for the location, seperating the location to have it independetly with all valid coordinates.

### Deployed

The app is deployed on Heroku and the link is <https://dooor2door.herokuapp.com/>, we can get the location from 2 places either from Postman with api request, or on the browser when the user update location endpoint

### Sockets

We have two sockets in the app, server socket that emit the location depending on event and client socket that listens the server.

### To run
run `npm install`to install all the dependencies

run `npm start` to start the server on <localhost:3000>

### To run tests 

run `export NODE_ENV='test'`to turn to test mode

run `node --experimental-vm-modules node_modules/jest/bin/jest.js` to run the unit tests
