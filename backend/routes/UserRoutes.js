const express = require("express");
const router = express.Router();

const {
  loginUser,
  purchaseCourse,
  getCourses,
  signupUser,
  authenticateUser,
  isLogin,
} = require("../Controllers/UserController");

router.post("/signup", signupUser);

router.post("/checkauth", authenticateUser, isLogin);

router.post("/login", loginUser);

router.get("/courses", authenticateUser, getCourses);

router.post("/courses/:courseId", authenticateUser, purchaseCourse);

router.get("/purchasedCourses", authenticateUser);

module.exports = router;
