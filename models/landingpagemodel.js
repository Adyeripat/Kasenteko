const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

/* Creating a Database Schema....schema should be the same format as req.body */
const registerSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: "Please Enter first name"
  },

  username: {
    type: String,
    unique: true,
    required: "Please Enter first name"
  },
  password: {
    type: String,
    required: "Please Enter first name"
  },
  lastname: String,
  gender: String,
  country: String,
  city: String
});

//adds another field so that you don't have to delete previous records
/* registerSchema.add({
  username: {
    type: String,
    unique: true,
    required: "Please Enter first name"
  }
}); */

//hashing a password before saving it to the database pre-save hook---------
/* hashing and salting(encrypting).....salt is the no. e.g 10..changes it 10 times
your password is saved as a string not your actual password i.e encrypts it */
registerSchema.pre("save", function(next) {
  this.password = bcryptjs.hashSync(this.password, 10);
  next();
});

registerSchema.statics.authenticate = async function(username, password) {
  const user = await this.findOne({ username: username });
  if (!user) {
    throw new Error("User not found.");
  }
  const match = await bcryptjs.compare(password, user.password);
  if (match) {
    return user;
  }
};

//create a model
module.exports = mongoose.model("Register", registerSchema);
