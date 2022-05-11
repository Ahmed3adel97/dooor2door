import mongoose from "mongoose";

// const url = "mongodb://localhost:27017/door2door";

function initDB() {
  mongoose.connect(process.env.MONGODB_URI, {
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
