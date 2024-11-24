const express = require("express");

const connectDB = require("./config/database");

const User = require("./models/user");

const app = express();


app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  console.log(user);

  try {
    await user.save();
    res.send("user added successsfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

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
