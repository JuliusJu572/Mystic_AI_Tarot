import OpenAI from 'openai';
import { SYSTEM_INSTRUCTION } from '../constants';
import { TarotCard } from '../types';

const client = new OpenAI({
  apiKey: "sk-0dV4zl6xm6echlPQ9378513eB1814f5c9e05C036A811C5Ed",
  baseURL: "https://aihubmix.com/v1",
  dangerouslyAllowBrowser: true
});

export async function getTarotReading(question: string, cards: TarotCard[], lang: 'en' | 'zh' = 'en'): Promise<string> {
  try {
    const cardDescriptions = cards.map((card, index) => {
        const position = index === 0 ? "Past/Context" : index === 1 ? "Present/Challenge" : "Future/Advice";
        const orientation = card.isReversed ? "Reversed (逆位)" : "Upright (正位)";
        return `Position ${index + 1} (${position}): ${card.name} (${card.nameCN}) - ${orientation}. Keywords: ${card.keywords.join(', ')}.`;
    }).join('\n');

    const languageInstruction = lang === 'zh' 
        ? "Please provide a detailed and insightful Tarot reading in Chinese (with English card names in brackets)."
        : "Please provide a detailed and insightful Tarot reading in English.";

    const prompt = `
    User Question: "${question}"
    
    The User drew the following cards:
    ${cardDescriptions}
    
    ${languageInstruction}
    `;

    const response = await client.chat.completions.create({
      model: "qwen3-max-preview",
      messages: [
        { role: "system", content: SYSTEM_INSTRUCTION },
        { role: "user", content: prompt }
      ],
      // @ts-ignore
      enable_thinking: true
    });

    return response.choices[0].message.content || "The mists are too thick... I cannot see the future right now. (Error generating response)";
  } catch (error) {
    console.error("AI Service Error:", error);
    return `The connection to the spiritual realm has been interrupted. Please try again later. (API Error: ${error instanceof Error ? error.message : String(error)})`;
  }
}