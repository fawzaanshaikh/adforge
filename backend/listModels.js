import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const main = async () => {
  const response = await genAI.listModels();
  console.log(JSON.stringify(response, null, 2));
};

main();
