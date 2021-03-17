const User = require("../models/user");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

//signUp
exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }
  //saving to database
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to save use in db"
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id
    });
  });
};

//signin
exports.signin = (req, res) => {
  const errors = validationResult(req);

  const { email, password } = req.body;
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }
  //checking if user exits
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User email doesn't exits"
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password doesnt match"
      });
    }
    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 999 });

    // send response to frontend
    const { _id, fullname, email } = user;
    return res.json({ token, user: { _id, fullname, email } });
  });
};

//signOut
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully"
  });
};

//protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  algorithms: ['sha1', 'RS256', 'HS256'],
  userProperty: "auth"
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "Access Denied !"
    });
  }
  next();
};
