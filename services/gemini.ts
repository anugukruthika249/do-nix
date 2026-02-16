
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

export const generateEmergencyAlert = async (patientDetails: string) => {
  if (!API_KEY) return null;
  
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a concise, high-impact emergency blood donor alert message based on these details: ${patientDetails}. Keep it under 150 characters for SMS/Notification.`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Alert Generation Failed:", error);
    return "Emergency Blood Needed: Please respond if you are nearby and eligible.";
  }
};

export const getDonorMatchAnalysis = async (donorCount: number, urgency: string) => {
  if (!API_KEY) return null;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `We have ${donorCount} donors matched for an urgency level of ${urgency}. Provide a 1-sentence analytical assessment of search success probability.`,
      config: {
        temperature: 0.5,
      }
    });
    return response.text;
  } catch (error) {
    return null;
  }
};
