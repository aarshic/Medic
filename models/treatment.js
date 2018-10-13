const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const treatmentSchema=new Schema({
    diagnosis:String,
    options:String
});

mongoose.model('Treatment',treatmentSchema);