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

// get Users by email

// app.get("/user", async (req, res) => {
//   try {
//     const userEmail = req.body.emailId;
//     const user = await User.find({ emailId: userEmail });
//     if (user.length === 0) {
//       res.status(404).send("User not found");
//     } else {
//       res.send(user);
//     }
//   } catch (error) {
//     res.status(400).send("something went wrong");
//   }
// });

// get user by id

app.get("/user", async (req, res) => {
  const userId = req.body._id;
  const user = await User.findById({ _id: userId });
  res.send(user);
});

// get all users

app.get("/feed", async (req, res) => {
  try {
    const getAllUser = await User.find({});
    res.send(getAllUser);
  } catch (error) {
    res.status(404).send("something went wrong");
  }
});


// update a user by id

app.patch("/user", async (req, res) => {
  const userId = req.body._id;
  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data, { 
      returnDocument : "after",
      runValidators : true
    }
    );
    console.log(user);
    res.send(user);
  } catch (error) {
    res.status(404).send("something went wrong" + error.message);
  }
});


// delete a user by id

app.delete("/user", async (req, res) => {
  try {
    const userId = req.body._id;
    const user = await User.findByIdAndDelete(userId);
    res.send(user);
  } catch (error) {
    res.status(404).send("something went wrong");
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
