const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateSignupData } = require("../utils/validate");

authRouter.post("/signup", async (req, res) => {
    // Validate signup data
    try {
      validateSignupData(req);
  
      // encrypt password
      const { firstName, lastName, emailId, password } = req.body;
      const passwordHash = await bcrypt.hash(password, 10);
      
  
      const user = new User ({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
      });
  
      await user.save();
      res.send("user added successsfuly");
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

authRouter.post("/login", async (req, res) => {
    try {
      const { emailId, password } = req.body;
  
      const user = await User.findOne({ emailId: emailId });
      if (!user) {
        throw new Error("Invalid  Credentials");
      }
  
      const ispasswordValid = await user.validatePassword(password)
  
      if (ispasswordValid) {
        // create a jwt token
  
        const token =  await user.getJWT();
  
        res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000)});
  
        res.send("Login succesfull");
      } else {
        throw new Error("Invalid Credentials");
      }
    } catch (err) {
      res.status(400).send("ERROR" + " " + err.message);
    }
  });

authRouter.post("/logout", async(req, res) =>{
    res.cookie("token", null ,{
       expires: new Date(Date.now())
    })
     
    res.send("logout successfull");
})


module.exports = authRouter;