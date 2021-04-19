const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const dbKey = require("./config/keys").MONGODB_URI

// setup express
const app = express();
const port = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

app.get("/",(req, res)=> res.status(200).send("Hi!"));

console.log("Starting Server");
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

const passport = require("passport");
const menuRouter = require('./routes/menu');


app.use(passport.initialize());
require("./config/passport")(passport);

app.use('/menu',menuRouter);

//setup mongoose
console.log("Connecting to MongoDB");

mongoose.connect( dbKey, 
    { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true },
    err => {
        if (err) return console.error(err);
        console.log("MongoDB connection established");
    });

app.use(passport.initialize());
require("./config/passport")(passport);

//setup mongoose
console.log("Connecting to MongoDB");

mongoose.connect( dbKey, 
    { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true },
    err => {
        if (err) return console.error(err);
        console.log("MongoDB connection established");
    });