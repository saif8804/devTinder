const express = require("express");
const { userAuth } = require("../middlewares/auth");

const userRouter = express.Router();


userRouter.post("/sendnewconnection", userAuth, (req, res) =>{
    const user = req.user;
     if(!user) {
       throw new Error("user not found");
     }

  console.log("send new connection");
  res.send(user.firstName +" " + "sending connection");
})

module.exports = userRouter