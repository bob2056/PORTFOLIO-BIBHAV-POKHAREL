import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

// Routes
import profileRoutes from "./routes/profile.routes";
import projectRoutes from "./routes/project.routes";
import skillRoutes from "./routes/skill.routes";
import contactRoutes from "./routes/contact.routes";
import authRoutes from "./routes/auth.routes";
import githubRoutes from "./routes/github.routes";

// Middleware
import { notFound, errorHandler } from "./middleware/error.middleware";

const app: Application = express();

// Security and utility middleware
app.use(
  helmet({
    crossOriginResourcePolicy: false, // Allow frontend to display static uploaded images
  }),
);

const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
app.use(
  cors({
    origin: [clientUrl, "http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
  }),
);

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Static files for uploaded images
const uploadsPath = path.resolve(__dirname, "../uploads");
app.use("/uploads", express.static(uploadsPath));

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    message: "Bibhav Pokharel's Portfolio API is running",
    health: "/api/health",
  });
});

// Health check endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    message: "Bibhav Pokharel's Portfolio API is running smoothly",
  });
});

// Mount API routes
app.use("/api/profile", profileRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/github", githubRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
