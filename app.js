// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();


// GLOBAL letIABLES

let items = ['Buy Food', 'Cook Food', 'Eat Food'];
let workItems = [];


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// Dealing with Home route and posts.
app.get("/", function(req, res){
    
    
    let today = new Date();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);
        
        res.render("list", {listTitle: day, newListItems: items});
});

app.post("/", function(req, res){

    let item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } 
    else {
        items.push(item);
        res.redirect("/");
    }
});





// Dealing with Work route and posts.

app.get('/work', function(req,res){
    res.render("list", {listTitle: "Work", newListItems:workItems});

});


app.post("/work", function(req, res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});



// Dealing with about route

app.get('/about', function(req,res){
    res.render("about");
});




// Starting server on port 3000

app.listen(3000, function(){
    console.log("Server started on port 3000.")
})