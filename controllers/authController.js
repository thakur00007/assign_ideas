const db = require("../db");
const Auth = require("../model/authModel");
const helper = require("../helper/helper");

exports.signup = async (req, res) => {
  let obj = {
    name: req.body.name,
    email: req.body.email,
    pass: req.body.pass,
    cnfPass: req.body.cnfPass,
  };

  if (!obj.name || !obj.email ||  !obj.pass) {
    helper.responseSender(res, 200, "fail", "One or more fields are empty", []);
  } else {
    let auth = new Auth();
    db.query(auth.find("user", obj.email), async (err, result) => {
      if (err) {
        helper.responseSender(res, 200, "fail", err.message, []);
      } else if (result.length === 1) {
        helper.responseSender(
          res,
          200,
          "fail",
          "this email already exists",
          []
        );
      } else {
        if (obj.pass === obj.cnfPass) {
          const hash = await helper.passwordHasher(obj.pass);
          obj.pass = hash;

          db.query(auth.createUser("user", obj), (err, result) => {
            if (err) {
              helper.responseSender(res, 200, "fail", err.message, []);
            } else {
              this.login(req, res);
            }
          });
        } else {
          helper.responseSender(
            res,
            200,
            "fail",
            "password and confirm password does't match",
            []
          );
        }
      }
    });
  }
};

exports.login = async (req, res) => {
  const obj = {
    email: req.body.email,
    pass: req.body.pass,
  };

  if (!obj.email || !obj.pass) {
    helper.responseSender(res, 200, "fail", "One or more fields are empty", []);
  } else {
    let auth = new Auth();

    db.query(auth.find("user", obj.email), async (err, result) => {
      if (err) {
        helper.responseSender(res, 200, "fail", err.message, []);
      } else if (result.length == 1) {
        // console.log(result);
        const matched = await helper.comparePass(obj.pass, result[0].password);

        if (matched) {
          const token = helper.createToken({
            name: result[0].name,
            email: obj.email,
          });
          helper.responseSender(res, 200, "success", "Login successfully", [
            {
              name: result[0].name,
              email: result[0].email,
              phone: result[0].phone,
              token: token,
              exp: new Date().getTime() + 86400 * 100 * 7,
            },
          ]);
        } else {
          helper.responseSender(res, 200, "fail", "Wrong Password", []);
        }
      } else {
        helper.responseSender(res, 200, "fail", "User Not Found", []);
      }
    });
  }
};