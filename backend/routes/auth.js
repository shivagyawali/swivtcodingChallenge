var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");

const { signup, signin, signout, isSignedIn } = require("../controllers/auth");

//SignUp route
router.post(
  "/signup",
  //validation
  [
    check("fullname", "name should be atleast 3 character").isLength({ min: 3 }),
    check("email", "Email is required").isEmail(),
    check("password", "Password should be 5 atleast character").isLength({
      min: 5
    })
  ],
  signup
);

//signin
router.post(
  "/signin",
  //validation
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password Field is required").isLength({ min: 1 })
  ],
  signin
);

router.get("/signout", signout);

//check with tokens
router.get("/test", isSignedIn, (req, res) => {
  res.send("this protected route");
});

module.exports = router;