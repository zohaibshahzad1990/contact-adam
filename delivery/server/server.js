const mongoose = require("mongoose");
const body_parser = require("body-parser");
const events = require("./routes");
var cors = require("cors");

var express = require("express");
var app = express();

mongoose
  .connect("mongodb+srv://zohaib:test@devconnector.nml2s.mongodb.net/EventList?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Db Connected"))
  .catch(() => console.log("Error in connecting database"));

app.use(cors());
app.use(body_parser.json());
app.use("/", events);

app.listen(3000);
