import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { createServer } from 'http';
import { Server } from "socket.io";
import initDB from './misc/db.js'
import router from './routes/vehicleRoutes.js'

// const app = express()
// const httpServer = createServer(app);

const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

// const io = require('socket.io').listen(server);

import path from 'path';
import { fileURLToPath } from 'url';
import socketModule from './misc/socket.js'

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
console.log('directory-name 👉️', __dirname);
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)
app.use(cors)
dotenv.config()
socketModule(io)
initDB();
// io.on('connection', function (socket) {
//   console.log('A user connected');

//   //Whenever someone disconnects this piece of code executed
//   socket.on('disconnect', function () {
//     console.log('A user disconnected');
//   });
// });
// socketModule(io);
// const url = "mongodb://localhost:27017/door2door";
// mongoose.connect(url, {
//   useNewUrlParser: true,
// });

// mongoose.connection.on('connected', () => {
//   console.log('Connected to the database');
// });

// mongoose.connection.on('error', (err) => {
//   console.error(`Failed to connected to the database: ${err}`);
// });
// var day1 = new Date("2019-12-02T12:00:00+01:20"); 
// var day2 = new Date("2019-12-02T12:00:00+01:00");

// var diff= Math.abs(day1-day2);
// console.log(day1 +1);
// console.log(day1 - 1);

const PORT = 3000;
httpServer.listen(PORT || 3000, () => {
  console.log(1)
})
export default io;