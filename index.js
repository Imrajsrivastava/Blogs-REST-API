const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const { connection } = require("./config/db");
// const { UserModel } = require("./models/model.user");
const { authentication } = require("./middlewears/authentication");
const { blogsRouter } = require("./routes/blogs.route");
const { authRouter } = require("./routes/auth.route");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

//signup...route

// app.post("/signup", async (req, res) => {
//   let { password, name, email } = req.body;

//   const alredyUser = await UserModel.find(
//   { $or:[{ name: name }, { email: email }]}
//   );

//   if (alredyUser) {
//     return res.status(401).send({ error: "user already exist.." });
//   }

//   bcrypt.hash(password, 10, async function (err, hashpassword) {
//     if (err) {
//       return err;
//     }

//     try {
//       const user = new UserModel({ ...req.body, password: hashpassword });

//       await user.save();

//       res.send({ msg: "signup done !" });
//     } catch (error) {
//       res.status(500).send({ msg: "something went wrong" });
//     }
//   });
// });

// //login route ..

// app.post("/login", async (req, res) => {
//   let { password, email } = req.body;

//   const user = await UserModel.findOne({ email });

//   if (!user) {
//     res.send({ msg: "wrong credential" });
//   }

//   let pass = await bcrypt.compare(password, user.password);

//   if (pass) {
//     // const token = jwt.sign({user_id:user._id},process.env.JWT_KEY);
//     // console.log("login generate token",token)

//     jwt.sign({ user_id: user._id }, process.env.JWT_KEY, function (err, token) {
//       console.log(token);
//       return res.send({ msg: "login done!", token: token });
//     });
//   } else {
//     res.send({ error: "wrong credential" });
//   }
// });

//auth routes...
app.use("/", authRouter);

//blogs routes ..
app.use("/blogs", authentication, blogsRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("database connected");
  } catch (error) {
    console.log("error while connecting database", error);
  }

  console.log(`server running http://localhost:${PORT}`);
});
