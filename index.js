/* require is a keyword used to use a package and below are the packages */
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs"); // requring the file system
const mongodb = require("mongodb");
const session = require("express-session");



const app = express(); // now we have our express app


/* mongoose db connection */
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/easymoney");



app.use(express.static("./public"));

var storage = multer.diskStorage({
  destination: function(req, photo, cb) {
    cb(null, "public/uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, file, +"-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage
});



// middleware
app.set("view engine", "pug"); //setting the view engine as pug
app.set("views", path.join(__dirname, "views")); //there's a folder called views and this is how to get it
app.use(bodyParser.urlencoded({ extended: true })); //for geting the posted data from the form in the console/body and the output is json
// app.use(bodyParser.json());



//express-session for tracking user's activity    or tracking logins
app.use(session({
secret:"thesecret",
resave: true,
saveUninitialized: false

}));



app.get('/upload',(req,res)=>{
  res.render('uploads')
})


app.post("/upload", upload.single('imageupload'), (req, res) => {
  res.send("File upload succesful");
});









//import routes
const landingpageRoute = require("./routes/landingpageroute");









const LeaderregistrationRoute = require("./routes/leaderregistrationroute");
app.use("/leaderregistration", LeaderregistrationRoute);


const LeaderloginRoute = require("./routes/leaderloginroute");
app.use("/leaderlogin", LeaderloginRoute);


const LeaderdashboardRoute = require("./routes/leaderdashboardroute");
app.use("/leaderdashboard", LeaderdashboardRoute);



const MemberregistrationRoute = require("./routes/memberregistrationroute");
const MemberloginRoute = require("./routes/memberloginroute");
const MemberdashboardRoute = require("./routes/memberdashboardroute");


app.use("/", landingpageRoute);







const memberlogoutRoute = require("./routes/memberlogoutroute");
app.use("/memberlogout", memberlogoutRoute);


const leaderlogoutRoute = require("./routes/leaderlogoutroute");
app.use("/leaderlogout", leaderlogoutRoute);








app.use("/memberregistration", MemberregistrationRoute);
app.use("/memberlogin", MemberloginRoute);
app.use("/memberdashboard", MemberdashboardRoute);



/* creates documents in the db------------------------------------- name of the collection model(collection storage,schemaStructure)....takes on the structure of schema and the req.body(user data) into the Register collection */
//const Register = mongoose.model("Register", registerSchema);

/* listening for requests: the server */
app.listen(4500, function() {
  console.log("Express listening  on 4500");
});
