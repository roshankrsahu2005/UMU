import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

let aiClient = null;

if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY') {
  try {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    console.log('✅ Google Gemini AI Client initialized successfully.');
  } catch (error) {
    console.warn('⚠️ Gemini AI Initialization Warning:', error.message);
  }
} else {
  console.log('ℹ️ Running backend with local deterministic NLP triage fallback engine.');
}

export function getGeminiClient() {
  return aiClient;
}
