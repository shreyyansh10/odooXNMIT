const express = require("express");
//create auth router
const authrouter = express.Router();
const {signup, login, checkAuth} = require("../controllers/auth.Controller.js");
const {verifyJWT} = require("../middleware/auth.Middleware.js");


// define the routes
authrouter.route("/signup").post(signup);
authrouter.route("/login").post(login);
authrouter.route("/auth-check").get(verifyJWT,checkAuth);


module.exports = authrouter;

