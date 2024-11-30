const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth =  async(req, res, next) => {
   try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("invalid token !!!!!!!");
    }
    const decodedData = await jwt.verify(token, "Dev@Tinder123");
    const { _id } = decodedData;
    const user = await User.findById(_id)
     if(!user){
        throw  new Error("user not found");
     }
    
    req.user = user;
  
     next();
   } catch (err) {
      res.status(400).send(err.message);
   }
 
};
module.exports = { userAuth };