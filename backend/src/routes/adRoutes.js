import express from "express";
import { generateScript } from "../ai/scriptGenerator.js";
import { createBasicVideo } from "../video/ffmpegService.js";

const router = express.Router();

// Generates script + simple stitched video
router.post("/generate", async (req, res) => {
  try {
    const { brand, tone, audience } = req.body;

    const script = await generateScript(brand, tone, audience);

    const videoPath = await createBasicVideo(script);

    return res.json({
      success: true,
      script,
      videoPath
    });

  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
