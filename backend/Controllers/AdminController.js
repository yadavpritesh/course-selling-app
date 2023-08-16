const express = require("express");
const Admin = require("../Models/AdminModel");
const Course = require("../Models/CourseModel");
const jwt = require("jsonwebtoken");

const AdminSecret = "hfaihi23hahk";
// MIDDLEWARES
exports.authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, AdminSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

exports.signupAdmin = async (req, res) => {
  const { username, password } = req.body;
  const exists = await Admin.findOne({ username });

  if (exists) {
    res.status(403).json({ message: "Admin already exists" });
  } else {
    const newAdmin = new Admin({ username, password });
    newAdmin.save();

    const token = jwt.sign({ username, role: "admin" }, AdminSecret, {
      expiresIn: "1h",
    });
    res.json({ message: "Admin created", token: token, username: username });
  }
};
exports.loginAdmin = async (req, res) => {
  // logic to log in admin
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  console.log(admin);
  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, AdminSecret, {
      expiresIn: "1h",
    });
    res.json({
      message: "Logged in successfully",
      token: token,
      username: username,
    });
  } else {
    res.status(403).json({ message: "invaild username or password" });
  }
};
exports.createCourse = async (req, res) => {
  console.log(req.file);
  const course = new Course(req.body);
  await course.save();
  res.json({ message: "Course created successfully", courseId: course.id });
};
exports.updateCourse = async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
    new: true,
  });
  if (course) {
    res.json({ message: "Course updated successfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
};
exports.getAllCourse = async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses });
};

exports.isLogin = (req, res) => {
  res.status(200).json({ message: "Logged in" });
};
