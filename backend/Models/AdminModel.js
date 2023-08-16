const { mongoose } = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// If the Admin model already exists, use it; otherwise, define the model
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
