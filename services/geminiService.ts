import { GoogleGenAI } from "@google/genai";
import { INITIAL_PROPERTIES, SERVICES, COMPANY_NAME, FOUNDER_NAME, FOUNDER_BIO } from '../constants';

const API_KEY = process.env.API_KEY || ''; // In a real app, ensure this is set securely.

// Initializing the model lazily to avoid issues if API key is missing during build
let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient && API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: API_KEY });
  }
  return aiClient;
};

const SYSTEM_INSTRUCTION = `
You are the "Emperor's Assistant", a helpful and sophisticated AI concierge for ${COMPANY_NAME}.
The founder is ${FOUNDER_NAME}. Bio: ${FOUNDER_BIO}.
We are a CAC registered real estate firm.

Here is our current property portfolio:
${JSON.stringify(INITIAL_PROPERTIES.map(p => ({ title: p.title, location: p.location, price: p.price, type: p.type, status: p.status, features: p.features })))}

Here are our services:
${JSON.stringify(SERVICES.map(s => s.title))}

Your goal is to assist visitors in finding properties, explaining our services, or learning about Chiemerie.
Be polite, professional, and persuasive. Use emojis sparingly but effectively.
If asked about a specific property, provide details from the list.
If asked about prices, quote them directly.
If you don't know something, ask them to contact the support team via the contact form.
Keep responses concise (under 100 words) unless detailed info is requested.
`;

export const generateAIResponse = async (userMessage: string): Promise<string> => {
  const client = getAiClient();
  if (!client) {
    return "I am currently offline (API Key missing). Please contact support directly.";
  }

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });
    
    return response.text || "I apologize, I couldn't process that request right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the server. Please try again later.";
  }
};