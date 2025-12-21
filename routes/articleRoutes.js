const express = require("express");
const router = express.Router();
const {
  TestApi,
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} = require("../controllers/articleController");

router.get("/test", TestApi);
router.get("/", getAllArticles);
router.post("/", createArticle);
router.get("/:id", getArticleById);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);

module.exports = router;
