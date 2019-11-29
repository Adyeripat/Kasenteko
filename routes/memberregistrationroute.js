const express = require("express");
const router = express.Router();
const Register = require("../models/landingpagemodel");

const mongoose = require("mongoose");

/* Routes */
//Get reads the registerform.pug and displays it on the path

// const Informer = mongoose.model("Register", registerSchema);

router.get("/", async (req, res) => {
  try {
    const items = await Register.find();
    console.log(items);
    res.render("memberregistration", { informers: items });
  } catch (err) {
    //.catch promise and used because nodejs asyncronously waits
    res.status(500).send("unable to save to database");
  }
});

router.post("/", async (req, res) => {
  const register = new Register(req.body); //create an instance of the Register model for data entered(req.body==got from the user)
  try {
    await register.save();
    console.log("Item has been saved");
    const items = await Register.find();
    res.render("memberlogin", { users: items });
  } catch (err) {
    //.catch promise and used because nodejs asyncronously waits
    res.status(500).send("unable to save to database");
  }
});

router.get("/search", async (req, res) => {
  if (req.session.user) {
    console.log(req.session.user);
    // try{
    //let allow for variable reassignmentk
    let items = await Register.find();
    // if (req.query.city){
    //   items = await Register.find({city:req.query.city})
    // }
    res.render("memberdashboard", {
      users: items,
      currentUser: req.session.user
    });
  } else {
    res.redirect("/memberlogin");
  }

  // catch(err){
  //   res.status(500).send('unable to search in the database')
  // }
  // }
});







/* router.get("/logout", async (req, res) => {
  if (req.session.user) {
    console.log(req.session.user);
    // try{
    //let allow for variable reassignmentk
    let items = await Register.find();
    // if (req.query.city){
    //   items = await Register.find({city:req.query.city})
    // }
    res.render("memberlogin", {
      users: items,
      currentUser: req.session.user
    });
  } else {
    res.redirect("/memberdashboard");
  }
 */
  // catch(err){
  //   res.status(500).send('unable to search in the database')
  // }
  // }
// });








module.exports = router;
