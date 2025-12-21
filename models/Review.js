const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: [true, "Le rating est requis"],
    min: [1, "Le rating doit être au minimum 1"],
    max: [5, "Le rating doit être au maximum 5"],
  },
  comment: {
    type: String,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "La référence au cours est requise"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "La référence à l'utilisateur est requise"],
  },
});

module.exports = mongoose.model("Review", reviewSchema);
