import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });

export async function generateEmbedding(text: string) {
  const result = await embeddingModel.embedContent(text);
  return result.embedding.values;
}

export async function generateResponse(
  prompt: string,
  context: string[],
  language: string = 'am',
  businessType: string = 'general'
) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const systemPrompt = `
You are EthioAI, a professional, friendly, and culturally aware Ethiopian AI assistant.
Answer in ${language === 'am' ? 'Amharic' : language === 'om' ? 'Afaan Oromoo' : 'English'}.
Be polite and use appropriate Ethiopian business etiquette.
Use ONLY the provided context to answer. If unsure, say you don't know.
`;

  const result = await model.generateContent([
    systemPrompt,
    `Context:\n${context.join('\n\n')}`,
    `Question: ${prompt}`
  ]);

  return result.response.text();
}
