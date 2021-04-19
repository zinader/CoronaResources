const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const dbKey = require("./config/keys").MONGODB_URI

// setup express
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/",(req, res)=> res.status(200).send("Hi hello!"));

console.log("Starting Server");
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

const resourceRouter = require('./routes/resource');
app.use('/resource',resourceRouter);

//setup mongoose
console.log("Connecting to MongoDB");

mongoose.connect( dbKey, 
    { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true },
    err => {
        if (err) return console.error(err);
        console.log("MongoDB connection established");
    });

