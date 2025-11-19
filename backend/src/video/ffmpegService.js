import ffmpeg from "fluent-ffmpeg";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createBasicVideo(script) {
  return new Promise((resolve, reject) => {
    
    const clip1 = path.join(__dirname, "../../stock-clips/clip1.mp4");
    const clip2 = path.join(__dirname, "../../stock-clips/clip2.mp4");

    if (!fs.existsSync(clip1) || !fs.existsSync(clip2)) {
      return reject(new Error("Missing local stock clips!"));
    }

    const outputPath = path.join(__dirname, "../../output.mp4");

    ffmpeg()
      .input(clip1)
      .input(clip2)
      .on("end", () => {
        resolve(outputPath);
      })
      .on("error", (err) => {
        reject(err);
      })
      .mergeToFile(outputPath);
  });
}
