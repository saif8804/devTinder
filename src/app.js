const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./route/authRoute");
const profileRouter = require("./route/profileRoute");
const requestRouter = require("./route/requestRoute");


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);


connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("server is listening on port 3000");
    });
  })
  .catch((error) => {
    console.log("Database not connected");
  });

// app.get("/admin/getUser", (req, res) => {

//     // throw new Error("error happens");
//     res.send("get a user");

// });

// app.use("/" ,(err, req, res, next) =>{
//     if(err) {
//       res.status(500).send("something went wrong");
//     }
// })

// // app.get("/admin/deleteUser", (req, res) => {
// //   res.send("deleted a user");
// // });
