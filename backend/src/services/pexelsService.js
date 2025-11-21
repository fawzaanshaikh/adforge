import fetch from "node-fetch";
import { config } from "../config.js";

export const fetchStockVideo = async (query) => {
    const url = `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=1`;

    const response = await fetch(url, {
        headers: {
        Authorization: config.pexelsKey,
        },
    });

    const data = await response.json();

    if (!data.videos?.length) return null;

    // Grab the highest-quality MP4 link
    const file = data.videos[0].video_files.find(
        (f) => f.quality === "hd" || f.quality === "sd"
    );

    return file?.link || null;
};