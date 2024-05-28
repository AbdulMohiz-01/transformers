const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");



API_KEY = "Your-api-key-here"
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}

async function run() {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "This is a severe Diebatic Retinopathy Fundus Image. Give me Generalized description of the image. that what should the patient do now? for example you have prompt with the severe Diebatic Retinopathy and this could happen due to the following reasons and now the patient should do the following things.";

  const imageParts = [
    fileToGenerativePart("./retina1.jpeg", "image/jpeg"),
  ];

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();