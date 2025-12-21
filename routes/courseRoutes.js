const express = require("express");
const router = express.Router();
const {
  createCourse,
  getAllCourses,
  getCourseById,
  enrollUserInCourse,
  getCourseStudents,
} = require("../controllers/courseController");

router.post("/", createCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.post("/:courseId/enroll", enrollUserInCourse);
router.get("/:courseId/students", getCourseStudents);

module.exports = router;
