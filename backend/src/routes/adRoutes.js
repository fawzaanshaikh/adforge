import express from "express";
import { generateAdStoryboard } from "../ai/scriptGenerator.js";
import { fetchStockVideo } from "../services/pexelsService.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
    try {
        const { brand, tone, audience } = req.body;

        if (!brand || !tone || !audience) {
            return res.status(400).json({ error: "Missing parameters" });
        }

        // STEP 1: Script
        const storyboard = await generateAdStoryboard(brand, tone, audience);

        // STEP 2: Fetch videos for each scene
        const scenesWithVideos = [];

        for (const scene of storyboard.scenes) {
        let videoUrl = null;

        // Try each keyword until one returns a video
        for (const kw of scene.keywords) {
            videoUrl = await fetchStockVideo(kw);
            if (videoUrl) break;
        }

        scenesWithVideos.push({
            ...scene,
            videoUrl: videoUrl || null,
        });
        }

        // Final output
        return res.json({
        success: true,
        script: storyboard.script,
        scenes: scenesWithVideos,
        });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: err.message });
    }
});

export default router;
