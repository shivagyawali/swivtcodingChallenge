const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
 
} = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

//get user by id
router.param("userId", getUserById);

//only logged in user's profile
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);



module.exports = router;