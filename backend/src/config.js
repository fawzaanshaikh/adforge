// pre-loading the .env variables
import dotenv from "dotenv";
dotenv.config();

export const config = {
    geminiKey: process.env.GEMINI_API_KEY,
    pexelsKey: process.env.PEXELS_API_KEY,
};