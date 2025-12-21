const asyncHandler = require("express-async-handler");
const Course = require("../models/Course");
const User = require("../models/User");

const createCourse = asyncHandler(async (req, res) => {
  const newCourse = new Course({
    title: req.body.title,
    description: req.body.description,
    instructor: req.body.instructor,
  });
  await newCourse.save();
  res.status(201).json(newCourse);
});

const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find();
  res.status(200).json(courses);
});

const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    res.status(404);
    throw new Error("Cours non trouvé");
  }
  res.status(200).json(course);
});

const enrollUserInCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { userId } = req.body;

  const course = await Course.findById(courseId);
  const user = await User.findById(userId);

  if (!course || !user) {
    res.status(404);
    throw new Error("Cours ou utilisateur non trouvé");
  }

  if (!course.students.includes(userId)) {
    course.students.push(userId);
    await course.save();
  }

  if (!user.courses.includes(courseId)) {
    user.courses.push(courseId);
    await user.save();
  }

  res.status(200).json({ message: "Utilisateur inscrit au cours avec succès" });
});

const getCourseStudents = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  const course = await Course.findById(courseId).populate(
    "students",
    "username email"
  );

  if (!course) {
    res.status(404);
    throw new Error("Cours non trouvé");
  }

  res.status(200).json(course.students);
});

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  enrollUserInCourse,
  getCourseStudents,
};
