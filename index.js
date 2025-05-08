const express = require("express");
const cors = require("cors");
const app = express()
//const DB = process.env.DB;


app.use(cors())
app.use(express.json())

app.use('/',(req, res) => {
return res.status(400).json({
  status: 400,
  data: { data: null, message: "done" },
});
});


//const PORT=3000;
//app.listen(PORT,()=>{
 //   console.log("server running");    
//})
module.exports = app;
