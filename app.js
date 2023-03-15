//jshint esversion:6

const express = require("express");

const bodyParser = require("body-parser");

const date = require(__dirname + "/date.js");

////////////////////////////////////////////////////////////////////////

const app = express();

let items = [];

////////////////////////////////////////////////////////////////////////

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

////////////////////////////////////////////////////////////////////////

app.get("/", function(req, res) {

  let day = date.getDate();  

  res.render("list", {listTitle: day, newListItems: items});

});

app.post("/", function(req, res) {

  let item = req.body.newItem;

  items.push(item);

  res.redirect("/");

});

////////////////////////////////////////////////////////////////////////

app.post("/delete", function(req, res) {

  let deleteItem = req.body.checkbox;

  let updatedItems = items.filter(function (item) {

    return item !== deleteItem;

  });

  items = updatedItems;

  res.redirect("/");
  
})

////////////////////////////////////////////////////////////////////////

app.listen(3000, function() {

  console.log("Server started on port 3000.");

});

////////////////////////////////////////////////////////////////////////
