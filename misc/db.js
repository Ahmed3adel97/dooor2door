import mongoose from "mongoose";

// const url = "mongodb://localhost:27017/door2door";
const url = "mongodb+srv://ahmed:amira97@cluster0.zjac9.mongodb.net/door2door212?retryWrites=true&w=majority";

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
