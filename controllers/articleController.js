const asyncHandler = require("express-async-handler");
const Article = require("../models/Article");

const TestApi = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "L'API fonctionne correctement !" });
});

const getAllArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find();
  res.status(200).json(articles);
});

const createArticle = asyncHandler(async (req, res) => {
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  });

  const savedArticle = await newArticle.save();
  res.status(201).json(savedArticle);
});

const getArticleById = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    res.status(404);
    throw new Error("Article non trouvé");
  }

  res.status(200).json(article);
});

const updateArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    res.status(404);
    throw new Error("Article non trouvé");
  }

  const updatedArticle = await Article.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json(updatedArticle);
});

const deleteArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    res.status(404);
    throw new Error("Article non trouvé");
  }

  await Article.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Article supprimé avec succès" });
});

module.exports = {
  TestApi,
  getAllArticles,
  createArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
};
