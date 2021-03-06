import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import initDB from "./misc/db.js";
import router from "./routes/vehicleRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import socketModule from "./misc/socket.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });
const config = dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(path.dirname(__filename), "index.html");
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use(cors);
dotenv.config();
socketModule(io);
initDB();
app.use(express.static("index.html"));
router.get("/", function (req, res) {
  res.sendFile(__dirname);
});
httpServer.listen(process.env.PORT || 3000, () => {});
export default io;
