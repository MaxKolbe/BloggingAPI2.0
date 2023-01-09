const mongoose = require("mongoose")
const {isEmail} = require("validator")//package that checks validity of emails

const Schema = mongoose.Schema

userModel = new Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: [true, 'Email must be unique'],
    validate: [isEmail, "Please enter a valid email"]//function to check email validity
    //alternatively create custom function to return boolean ---()=>{}
  }, 
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "minimum password length is six"]
  }
})

module.exports = mongoose.model("users", userModel)