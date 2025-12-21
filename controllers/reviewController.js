const asyncHandler = require("express-async-handler");
const Review = require("../models/Review");
const Course = require("../models/Course");

const addReview = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { rating, comment, userId } = req.body;

  const course = await Course.findById(courseId);
  if (!course) {
    res.status(404);
    throw new Error("Cours non trouvé");
  }

  const review = await Review.create({
    rating,
    comment,
    course: courseId,
    user: userId,
  });

  res.status(201).json(review);
});

const getCourseReviews = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  const reviews = await Review.find({ course: courseId }).populate(
    "user",
    "username email"
  );

  res.status(200).json(reviews);
});

module.exports = {
  addReview,
  getCourseReviews,
};
