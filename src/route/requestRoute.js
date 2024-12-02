const express = require("express");
const { userAuth } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");

const requestRoute = express.Router();


requestRoute.post("request/send/:status/:toUserId", userAuth, async(req, res) =>{
       
  const fromUserId = req.user._id;
  const toUserId =  req.params.toUserId;
  const status = req.params.status;

      const connectionRequest = new connectionRequest({
        fromUserId,
        toUserId,
        status
      })
     
      const data = await connectionRequest.save();

      res.json({
        message :"connection sent successfully",
        data
      })

})

module.exports = requestRoute