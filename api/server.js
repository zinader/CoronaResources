import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import resourceRouter from "./routes/resource.js";
import dotenv from "dotenv";

dotenv.config();

// Setup express
const app = express();
const port = process.env.PORT || 7000;

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.status(200).send("Server is up!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// Connect to MongoDB
console.log("Connecting to MongoDB");

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.error(err);
      process.exit(1); // Exit the process if unable to connect to MongoDB
    }
    console.log("MongoDB connection established");
  }
);

// Resource router
app.use("/resource", resourceRouter);
