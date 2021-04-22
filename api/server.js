import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// setup express
const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.status(200).send("Hi hello!"));

console.log("Starting Server");
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

import router from "./routes/resource.js";

app.use("/resource", router);

//setup mongoose
console.log("Connecting to MongoDB");

mongoose.connect(
  "mongodb+srv://pulkit0786:covid123@cluster0.dcbg2.mongodb.net/MyFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  (err) => {
    if (err) return console.error(err);
    console.log("MongoDB connection established");
  }
);
