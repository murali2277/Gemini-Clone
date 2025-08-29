import { GoogleGenAI } from "@google/genai";

// For client-side usage, the API key must be explicitly passed.
// It's recommended to use a Vite-specific environment variable for this.
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export default ai;
