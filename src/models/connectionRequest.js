const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
    },

    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
    },

    status: {
      type: String,
      enum: {
        values: ["intersted", "ignored", "accepted", "rejected"],
        message: `{VALUE } is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("connectionRequest",connectionRequestSchema)
