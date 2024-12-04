const express = require("express");
const requestRoute = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const ConnectionRequestModel = require("../models/connectionRequest");

requestRoute.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const allowedStatus = ["ignored", "intrested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).send();
      }

      const toUser = await User.findById(toUserId);

      if (!toUser) {
        return res.status(400).send({ message: " User not found" });
      }
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "connection Request already exist" });
      }

      const data = await connectionRequest.save();
      res.json({
        message:
          req.user.firstName +
          " " +
          "is" +
          " " +
          status +
          " " +
          "in" +
          " " +
          toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
);

requestRoute.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedinUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];

      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid Status");
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedinUser._id,
        status: "intrested",
      });

      if (!connectionRequest) {
        return res.status(404).send("connection request not found");
      }

      connectionRequest.status = status;

      const data = await connectionRequest.save();

      res.json({
        message: "request accepted",
        data,
      });
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
);

module.exports = requestRoute;
