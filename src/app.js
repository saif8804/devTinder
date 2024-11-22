const express = require("express");

const app = express();

// app.use( "/", ( req, res ) =>{
//      res.send("HAHAHAHAHAHAHAHA")
// })

app.get( "/user", ( req, res ) =>{
    res.send("this is for testing purpose")
})

app.post("/user", (req, res) =>{
    res.send("succesfully store in databse");
})


app.delete("/user", (req, res) =>{
     res.send("delete")
})


app.listen(3000, () =>{
      console.log("server is listening on port 3000");
})
