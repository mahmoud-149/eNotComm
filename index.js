const express = require("express");
const cors = require("cors");
const moongose= require("mongoose")
require("dotenv").config();

const app = express()
const DB = process.env.DB;
app.use(cors())
app.use(express.json())



moongose.connect(DB).then(()=>{
    console.log("db connected");
    
}).catch((e)=>{
    console.log(e.message);
    console.log("db error");
    
})


app.use('/',(req, res) => {
return res.status(200).json({
    message:"done"
});
});


//const PORT=3000;
//app.listen(PORT,()=>{
 //   console.log("server running");    
//})
module.exports = app;
