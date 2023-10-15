const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  membership: {type: Boolean, default: false},
  admin: {type: Boolean, default: false},
});

UserSchema.statics.findUserByEmail = async function (email) {
  return this.findOne({email}).exec();
};

UserSchema.statics.findUserById = async function (_id) {
  return this.findOne({_id}).exec();
};

module.exports = mongoose.model("User", UserSchema);
