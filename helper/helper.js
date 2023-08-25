const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const KEY = process.env.KEY;
exports.passwordHasher = async (pass) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pass, salt);
    return hash;
  } catch (error) {
    console.log(error);
  }
};

exports.comparePass = async (pass, hash) => {
  try {
    const matched = await bcrypt.compare(pass, hash);
    return matched;
  } catch (error) {
    console.log(error);
  }
};

exports.createToken = (payload) => {
  return jwt.sign(payload, KEY, { expiresIn: "7d" });
};

exports.verifyToken = (token, payload) => {
  try {
    const decode = jwt.verify(token, KEY);

    const decodeData = { name: decode.name, email: decode.email };
    const isTrue =
      decode.exp >= decode.iat &&
      JSON.stringify(payload) === JSON.stringify(decodeData);
    return isTrue;
  } catch (error) {
    return false;
  }
};

exports.verifyLoggedIn = (req) => {
  try {
    const obj = {
      name: req.query.name || req.body.auth.name,
      email: req.query.email || req.body.auth.email,
    };
    return this.verifyToken(req.query.token || req.body.auth.token, obj);
  } catch (error) {
    return false;
  }
};

exports.dataValidator = (data) => {
  return (
    data === null ||
    data === [] ||
    data === "" ||
    data === undefined ||
    typeof data !== "string"
  );
};

exports.responseSender = (res, code, status, msg, data) => {
  // console.log("here");
  res.status(code).json({
    status: status,
    message: msg,
    data: data,
  });
};
