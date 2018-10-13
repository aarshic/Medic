const express=require("express");

const mongoose=require("mongoose");
const bodyParser=require('body-parser');

require("./models/treatment");

mongoose.connect("mongodb://aarshic:qwerty0@ds243041.mlab.com:43041/medic");

const treatmentRouter=require("./routes/treatment");

const app=express();
app.use(bodyParser.json());

app.use("/api/data",treatmentRouter);


const PORT= 5000;

app.listen(PORT,()=>{console.log("server started successfully")});