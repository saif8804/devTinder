const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required : true,
    minLength : 4,
    maxLength : 50
  },

  lastName: {
    type: String,
  },

  emailId: {
    type: String,
    lowercase : true,
    required : true,
    unique : true,
    trim : true
  },

  password: {
    type: String,
    required : true
  },
  age: {
    type: Number,
     min : 18
  },

  gender : {
    type: String,
    validate(value){
      if (!["male", "female"," others"].includes(value)){
        throw new Error("Gender data is not valid");
      };
    
    }
  },

   skills :{
     type : [String]
   },
   
   photo :{
    type : String,
    default : "https://fastly.picsum.photos/id/1/5000/3333.jpg?hmac=Asv2DU3rA_5D1xSe22xZK47WEAN0wjWeFOhzd13ujW4" 
   }
},
 {
  timestamps : true
 }
);

module.exports = mongoose.model("User", userSchema);