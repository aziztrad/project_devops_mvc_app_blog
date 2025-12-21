const asyncHandler = require("express-async-handler");
const Profile = require("../models/Profile");

const createProfile = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const existingProfile = await Profile.findOne({ user: userId });
  if (existingProfile) {
    res.status(400);
    throw new Error("Un profil existe déjà pour cet utilisateur");
  }

  const newProfile = new Profile({
    user: userId,
    bio: req.body.bio,
    website: req.body.website,
  });
  await newProfile.save();
  res.status(201).json(newProfile);
});

const getProfile = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const profile = await Profile.findOne({ user: userId }).populate(
    "user",
    "username email"
  );
  if (!profile) {
    res.status(404);
    throw new Error("Profil non trouvé");
  }
  res.json(profile);
});

const updateProfile = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const profile = await Profile.findOne({ user: userId });
  if (!profile) {
    res.status(404);
    throw new Error("Profil non trouvé");
  }

  if (req.body.bio !== undefined) {
    profile.bio = req.body.bio;
  }
  if (req.body.website !== undefined) {
    profile.website = req.body.website;
  }

  await profile.save();
  res.json(profile);
});

module.exports = {
  createProfile,
  getProfile,
  updateProfile,
};
