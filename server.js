const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
let port=3000;
app.listen(port,()=>{
console.log(`your server is running on port ${3000}`);
});
app.use((req,res)=>{
    console.log("request is received");
    res.send("this is a string");
});
