const express = require("express");
const router = express.Router();
const Register = require("../models/landingpagemodel");

const mongoose = require("mongoose");






router.get("/", (req, res) => {
  res.render("leaderlogin");
});




router.post("/", async (req, res) => {
  try {
    const user = await Register.authenticate(
      req.body.username,
      req.body.password
    );
    // res.send("hey " + user.firstname + " " + user.lastname)
    req.session.user = user;
    console.log(user)
    //  res.render("leaderdashboard");
    res.redirect("/leaderregistration/search"); //not good to use
  } catch {
    res.send("Login Failed")

    // res.redirect('register')
    // res.render("leaderlogin", { error: "Failed to login, Please try again" });
  }
});


module.exports = router;
