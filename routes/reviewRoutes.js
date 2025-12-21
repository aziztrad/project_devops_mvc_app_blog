const express = require("express");
const router = express.Router();
const {
  addReview,
  getCourseReviews,
} = require("../controllers/reviewController");

router.post("/:courseId/reviews", addReview);
router.get("/:courseId/reviews", getCourseReviews);

module.exports = router;
