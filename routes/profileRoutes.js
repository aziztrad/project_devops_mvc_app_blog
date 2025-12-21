const express = require("express");
const router = express.Router();
const {
  createProfile,
  getProfile,
  updateProfile,
} = require("../controllers/profileController");

router.post("/:userId/profile", createProfile);
router.get("/:userId/profile", getProfile);
router.put("/:userId/profile", updateProfile);

module.exports = router;
