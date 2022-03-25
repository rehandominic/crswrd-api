const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');

mongoose.connect("mongodb+srv://admin-rehan:test123@cluster0.e6sod.mongodb.net/crswrdDB");

const crswrdSchema = {
    date: String,
    word: String,
    hint: String,
    solution: String,
    clue: String,
    source: String,
    source_date: String,
    difficulty: Number
}

const Crswrd = mongoose.model("Crswrd", crswrdSchema);


app.get("/crswrd",function(req,res) {

    Crswrd.find(function(err, foundCrswrds){
        if (!err) {
            res.send(foundCrswrds);
        } else {
            res.send(err);
        }
    });
});

app.get("/crswrd/:crswrdDate",function(req,res){

    Crswrd.findOne({date: req.params.crswrdDate}, function(err, foundCrswrd){
        if(foundCrswrd) {
            res.send(foundCrswrd);
        } else {
            res.send("No CRSWRD for this date found!");
        }
    });
});


app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on Port.");
});
