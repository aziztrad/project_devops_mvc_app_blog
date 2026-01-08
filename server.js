require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const promBundle = require("express-prom-bundle"); // AJOUT
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

connectDB();
const app = express();
const PORT = 3000;

// MIDDLEWARE POUR LES MÉTRIQUES PROMETHEUS (AJOUT)
const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  customLabels: { project_name: "blog_app" },
  promClient: { collectDefaultMetrics: {} },
});

app.use(express.json());
app.use(metricsMiddleware); // AJOUT - Après express.json()

const articleRoutes = require("./routes/articleRoutes");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const courseRoutes = require("./routes/courseRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

// Routes de santé pour Kubernetes
app.get("/health/live", (req, res) => {
  res.status(200).send("OK");
});

app.get("/health/ready", async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    if (dbState !== 1) {
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

// Route pour les métriques Prometheus (optionnelle mais recommandée)
app.get("/metrics", async (req, res) => {
  try {
    const metrics = await promBundle.promClient.register.metrics();
    res.set("Content-Type", "text/plain");
    res.end(metrics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.status(200).send("<h1>Page d'accueil de notre API de Blog</h1>");
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
