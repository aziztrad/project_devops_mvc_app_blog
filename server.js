require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose"); // ← AJOUTEZ CETTE LIGNE
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

connectDB();
const app = express();
const PORT = 3000;

app.use(express.json());

const articleRoutes = require("./routes/articleRoutes");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const courseRoutes = require("./routes/courseRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

// Liveness probe - vérifie si l'application est en vie
app.get("/health/live", (req, res) => {
  res.status(200).send("OK");
});

// Readiness probe - vérifie les dépendances (MongoDB)
app.get("/health/ready", async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    if (dbState !== 1) {
      // 1 = connected
      return res.status(503).json({
        status: "Service Unavailable",
        mongodb: "not connected",
      });
    }
    res.status(200).json({
      status: "OK",
      mongodb: "connected",
    });
  } catch (error) {
    res.status(503).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.status(200).send("<h1>Page d_accueil de notre API de Blog</h1>");
});

app.use("/api/articles", articleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users", profileRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/courses", reviewRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
