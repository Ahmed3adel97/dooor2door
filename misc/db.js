import mongoose from "mongoose";
import dotenv from "dotenv";
const config = dotenv.config();
dotenv.config();

let url;
if (process.env.NODE_ENV ==='dev'){
   url = process.env.MONGODB_URI
}
if (process.env.NODE_ENV ==='test'){
   url = process.env.MONGODB_URITest
}
function initDB() {
  mongoose.connect(url, {
    useNewUrlParser: true,
  });

  mongoose.connection.on("connected", () => {
    console.log("Connected to the database");
  });

  mongoose.connection.on("error", (err) => {
    console.error(`Failed to connected to the database: ${err}`);
  });
}
export default initDB;
