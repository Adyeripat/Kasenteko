const express = require("express");
const router = express.Router();
const Register = require("../models/landingpagemodel");

const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  if (req.session.user) {
    //console.log(req.session.user)
    // try{
    //let allow for variable reassignment
    let items = await Register.find();
    // if (req.query.city){
    //   items = await Register.find({city:req.query.city})
    // }
    res.render("leaderdashboard", {
      users: items,
      currentUser: req.session.user
    });
  } else {
    res.redirect("/leaderlogin");
  }
});


module.exports = router;
