const express = require("express");
const bodyparser = require("body-parser");
const {createServer}=require('http')
const server=createServer((req,res)=>{
  res.statusCode=200
  res.setHeader('Content-Type','text/plain')
  res.end('hello World')
})
const cors = require("cors");
require("dotenv").config();
const app = express();
const indexRouter = require("./routes/index");
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(express.static("public"));

app.listen(3003, () => console.log(`Listening on port :3003`));

app.use("/", indexRouter);
app.use(function (req, res, next) {
  next();
});
