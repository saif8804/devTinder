const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },

    lastName: {
      type: String,
    },

    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not Valid");
        }
      },
    },

    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("password is not strong");
        }
      },
    },

    age: {
      type: Number,
      min: 18,
    },

    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", " others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },

    skills: {
      type: [String],
    },

    photo: {
      type: String,
      default:
        "https://fastly.picsum.photos/id/1/5000/3333.jpg?hmac=Asv2DU3rA_5D1xSe22xZK47WEAN0wjWeFOhzd13ujW4",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("invalid photo URL");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);



userSchema.index({firstName : 1 , lastName : 1})

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "Dev@Tinder123", {
    expiresIn: "7d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (UserPasswordInput) {
  const user = this;
  const ispasswordValid = await bcrypt.compare(
    UserPasswordInput,
    user.password
  );

  return ispasswordValid;
};

module.exports = mongoose.model("User", userSchema);
