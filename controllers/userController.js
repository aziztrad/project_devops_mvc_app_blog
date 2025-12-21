const asyncHandler = require("express-async-handler");
const User = require("../models/User");

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
  const course = await Course.findById(req.params.courseId).populate(
    "students",
    "username email"
  );

  if (!course) {
    res.status(404);
    throw new Error("Cours non trouvé.");
  }
  res.status(200).json(course.students);
});

const addReview = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { rating, comment, userId } = req.body;

  const course = await Course.findById(courseId);
  if (!course) {
    res.status(404);
    throw new Error("Cours non trouvé.");
  }

  const review = await Review.create({
    rating,
    comment,
    course: courseId,
    user: userId,
  });
  res.status(201).json(review);
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

const createUser = asyncHandler(async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  const savedUser = await newUser.save();
  res.status(201).json(savedUser);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("Utilisateur non trouvé");
  }

  res.status(200).json(user);
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("Utilisateur non trouvé");
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updatedUser);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("Utilisateur non trouvé");
  }

  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Utilisateur supprimé avec succès" });
});

const getUserCourses = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId).populate("courses");

  if (!user) {
    res.status(404);
    throw new Error("Utilisateur non trouvé");
  }

  res.status(200).json(user.courses);
});

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserCourses,
};
