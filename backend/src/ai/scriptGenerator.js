import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "../config.js";

const genAI = new GoogleGenerativeAI(config.geminiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export const generateAdStoryboard = async (brand, tone, audience) => {
    const prompt = `
        You are an AI system generating structured storyboard data for a 15-second advertisement video.

        Brand: ${brand}
        Tone: ${tone}
        Audience: ${audience}

        Output STRICT JSON in the following format:

        {
            "script": "Full narration script here",
            "scenes": [
            {
                "id": 1,
                "description": "Short visual description",
                "keywords": ["keyword1", "keyword2"]
            }
            ]
        }

        Rules:
        - Return ONLY JSON.
        - 4-7 scenes max.
        - Narration script must be ~3-4 short lines.
        - Each scene must have 2-5 relevant keywords.
    `;

    const result = await model.generateContent(prompt);
    const raw = result.response.text().trim();

    // Ensure clean JSON (Gemini sometimes wraps in ```json ...)
    const json = raw.replace(/```json|```/g, "");

    return JSON.parse(json);
};
