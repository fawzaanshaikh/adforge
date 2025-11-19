import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export async function uploadVideo(filePath) {
  // TODO: implement actual upload later
  return "https://fake-url.com/video.mp4";
}
