const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();
const dotenv = require("dotenv");
dotenv.config();

const { UserModel } = require("../models/model.user");

//signup route ..
authRouter.post("/signup", async (req, res) => {
  let { password } = req.body;

  bcrypt.hash(password, 10, async function (err, hashpassword) {
    if (err) {
      return err;
    }

    try {
      const user = new UserModel({ ...req.body, password: hashpassword });

      await user.save();

      res.send({ msg: "signup done !" });
    } catch (error) {
      res.status(500).send({ msg: "something went wrong" });
    }
  });
});

//login route ..

authRouter.post("/login", async (req, res) => {
  let { password, email } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    res.send({ msg: "wrong credential" });
  }

  let pass = await bcrypt.compare(password, user.password);

  if (pass) {
    let token = jwt.sign({ user_id: user._id }, "xyzrlmno");
    console.log(token);

    res.send({ msg: "login done!", token: token });
  } else {
    res.send({ msg: "wrong credential" });
  }
});

module.exports = { authRouter };
