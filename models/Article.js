const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Le titre est obligatoire"],
    trim: true,
    minLength: [5, "Le titre doit contenir au moins 5 caractères"],
    maxLength: [100, "Le titre ne peut pas dépasser 100 caractères"],
  },
  content: {
    type: String,
    required: [true, "Le contenu est obligatoire"],
    trim: true,
    minLength: [20, "Le contenu doit contenir au moins 20 caractères"],
    maxLength: [5000, "Le contenu ne peut pas dépasser 5000 caractères"],
  },
  author: {
    type: String,
    default: "Anonyme",
    trim: true,
    maxLength: [50, "Le nom de l'auteur ne peut pas dépasser 50 caractères"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Article", articleSchema);
