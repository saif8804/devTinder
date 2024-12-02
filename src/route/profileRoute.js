const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditData, validatePassword } = require("../utils/validate");
const profileRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.send("ERROR" + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditData(req)) {
      throw new Error("data is not valid");
    }

    const loggedinUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedinUser[key] = req.body[key]));
    res.json({
      message: `${loggedinUser.firstName} edited sucessfully`,
      data: loggedinUser,
    });
    await loggedinUser.save();
  } catch (err) {
    res.status(400).send(err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    let userPassword = req.user;

    if (!userPassword) {
      throw new Error("password not valid");
    }

    const { password } = req.body;
    const updatedPassword = await bcrypt.hash(password, 10);

    Object.keys(req.body).forEach(
      (key) => (userPassword[key] = updatedPassword)
    );
    res.send(userPassword);
    await userPassword.save();
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = profileRouter;
