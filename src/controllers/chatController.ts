import type { Request, Response, NextFunction } from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_MODEL_NAME = process.env.GEMINI_MODEL_NAME || 'gemini-1.5-flash';

if (!GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: GEMINI_MODEL_NAME });

const roleDescription = `
You are a language teacher. Your name is Helga. 
You help users by evaluating the correctness of their sentences and providing suggestions for improvement.
Your feedback should be concise, no longer than 20 words.
If the sentence has mistakes, point them out and suggest corrections.
If the sentence is correct, do not answer in English, keep the German conversation going as if you are just another participant, helping make the conversation flow naturally, and answer in German.
`;

async function chatResponse(message: string) {
  const prompt = `${roleDescription}\nUser: ${message}`;
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export const chatMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message } = req.body;
    const chatComment = await chatResponse(message);
    const aiResponse = { id: Date.now(), message: chatComment };
    res.status(201).json(aiResponse);
  } catch (error) {
    next(error);
  }
};
