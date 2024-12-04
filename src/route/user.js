const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const USER_SAFE_DATA = "firstName lastName age gender skills photo"


userRouter.get("/user/requests/recieved", userAuth, async (req, res) =>{
     
   try {
    const loggedinUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
       toUserId : loggedinUser._id,
       status :"intrested"
    }).populate("fromUserId", ["firstName" ,"lastName"])

       res.json({
         message :"data fetched successfully",
         data : connectionRequest,
       })
   } catch (err) {
      res.status(400).send(err.message);
   }


})

userRouter.get("/user/connections", userAuth, async(req, res) =>{
   try {
      const loggedinUser = req.user;
       
      const connectionRequest = await ConnectionRequest.find({
         $or :[
            {fromUserId : loggedinUser._id, status : "accepted"},
            {toUserId : loggedinUser._id, status : "accepted"},
         ]
      }).populate("fromUserId", ["firstName", "lastName"]).populate("toUserId",["firstName", "lastName"])

   const data = connectionRequest.map((row) => {
     if(  row.fromUserId._id.toString() === loggedinUser._id.toString()){
        return row.toUserId
     }
       return row.fromUserId
   })


      res.json({data : data})


   } catch (err) {
       res.status(400).send({message : err.message})
   }
})


userRouter.get("/feed", userAuth, async(req, res) =>{
    try {
        const loggedinUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
           $or:[
             {fromUserId : loggedinUser._id},
             {toUserId :loggedinUser._id}
           ]
        }).select("fromUserId  toUserId");
      
        const hideUsersFromFeed = new Set();

         connectionRequest.forEach((req) =>{
             hideUsersFromFeed.add(req.fromUserId.toString());
             hideUsersFromFeed.add(req.toUserId.toString());
         })
         
      const user = await User.find({
          $and :[
            {_id :{ $nin : Array.from(hideUsersFromFeed)}},
            {_id : {$ne : loggedinUser._id}}
          ]
      }).select(USER_SAFE_DATA);
         

        
      res.json({data: user});


    } catch (err) {
       res.status(400).send({message : err.message})
    }
})

module.exports = userRouter;