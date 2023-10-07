const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  
  Username: String,
  EmailId:String,
  Address:String,
  password: String,
  IsActive:Boolean,
  ProfileId: String,

});

const UserTable = mongoose.model('UserInfo', userSchema);




module.exports = UserTable;
