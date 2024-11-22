const express = require("express");

const app = express();


app.use( "/test", ( req, res ) =>{
    res.send("this is for testing purpose")
})

app.use( "/", ( req, res ) =>{
     res.send("Hello this is my first project in node")
})



app.listen(3000, () =>{
      console.log("server is listening on port 3000");
})
