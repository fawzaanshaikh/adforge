import express from "express";
import cors from "cors";
import adRoutes from "./routes/adRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/ad", adRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});