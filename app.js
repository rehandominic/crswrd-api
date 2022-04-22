const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');

mongoose.connect("mongodb+srv://admin-rehan:test123@cluster0.e6sod.mongodb.net/crswrdDB");

const crswrdSchema = {
    _id: String,
    date: String,
    clue1: String,
    clue2: String,
    clue3: String,
    clue4: String,
    difficulty1: String,
    difficulty2: String,
    difficulty3: String,
    difficulty4: String,
    hint1: String,
    hint2: String,
    hint3: String,
    hint4: String,
    number: String,
    solution1: String,
    solution2: String,
    solution3: String,
    solution4: String,
    word1: String,
    word2: String,
    word3: String,
    word4: String,
    
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
