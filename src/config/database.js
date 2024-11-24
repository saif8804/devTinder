const mongoose = require("mongoose")

const connectDB = async () =>{

   await mongoose.connect("mongodb+srv://Saifali:NAS8IEkgYF4zJoLR@namastenode.wixsk.mongodb.net/devTinder")

}


module.exports  =  connectDB;