const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
       ref :"User",
      type: mongoose.Schema.Types.ObjectId,
      required :true,
    },

    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref :"User",
      required :true,

    },

    status: {
      type: String,
      enum: {
        values: ["intrested", "ignored", "accepted", "rejected"],
        message: `{VALUE } is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);



connectionRequestSchema.index({fromUserId : 1, toUserId : 1})

connectionRequestSchema.pre("save", function( next){
   const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
         throw new Error("can't send connection request to yourself");
    }

    next()
})

const ConnectionRequestModel =  new mongoose.model("ConnectionRequest",connectionRequestSchema)

module.exports =  ConnectionRequestModel;
