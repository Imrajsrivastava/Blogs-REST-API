const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authentication = (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).send({ msg: "login first 1 " });
    return;
  } else {
    jwt.verify(token, process.env.JWT_KEY, function (err, payload) {
      if (err) {
        return res.status(401).send({ msg: "login first 2" });
      } else {
        let { user_id } = payload;
        req.user = user_id;

        next();
      }
    });
  }
};

module.exports = { authentication };
