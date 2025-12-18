import { TarotCard } from './types';

// Source: Local images stored in the /imgs directory (based on user description)
const BASE_URL = "/imgs";

// --- DICTIONARY MAPPING ---
// Based on the user's file explorer screenshot.
// Majors: 00-TheFool.png, 01-TheMagician.png, etc. (No spaces)
// Minors: Cups01.png, Wands14.png, etc.

const MAJOR_CARDS_DICTIONARY = [
  { id: 0, en: "The Fool", cn: "愚者", filename: "00-TheFool.png" },
  { id: 1, en: "The Magician", cn: "魔术师", filename: "01-TheMagician.png" },
  { id: 2, en: "The High Priestess", cn: "女祭司", filename: "02-TheHighPriestess.png" },
  { id: 3, en: "The Empress", cn: "皇后", filename: "03-TheEmpress.png" },
  { id: 4, en: "The Emperor", cn: "皇帝", filename: "04-TheEmperor.png" },
  { id: 5, en: "The Hierophant", cn: "教皇", filename: "05-TheHierophant.png" },
  { id: 6, en: "The Lovers", cn: "恋人", filename: "06-TheLovers.png" },
  { id: 7, en: "The Chariot", cn: "战车", filename: "07-TheChariot.png" },
  { id: 8, en: "Strength", cn: "力量", filename: "08-Strength.png" },
  { id: 9, en: "The Hermit", cn: "隐士", filename: "09-TheHermit.png" },
  { id: 10, en: "Wheel of Fortune", cn: "命运之轮", filename: "10-WheelOfFortune.png" },
  { id: 11, en: "Justice", cn: "正义", filename: "11-Justice.png" },
  { id: 12, en: "The Hanged Man", cn: "倒吊人", filename: "12-TheHangedMan.png" },
  { id: 13, en: "Death", cn: "死神", filename: "13-Death.png" },
  { id: 14, en: "Temperance", cn: "节制", filename: "14-Temperance.png" },
  { id: 15, en: "The Devil", cn: "恶魔", filename: "15-TheDevil.png" },
  { id: 16, en: "The Tower", cn: "高塔", filename: "16-TheTower.png" },
  { id: 17, en: "The Star", cn: "星星", filename: "17-TheStar.png" },
  { id: 18, en: "The Moon", cn: "月亮", filename: "18-TheMoon.png" },
  { id: 19, en: "The Sun", cn: "太阳", filename: "19-TheSun.png" },
  { id: 20, en: "Judgement", cn: "审判", filename: "20-Judgement.png" },
  { id: 21, en: "The World", cn: "世界", filename: "21-TheWorld.png" }
];

// Minor Arcana Configuration
// Files are named like: Cups01.png, Swords14.png
const SUITS = [
  { name: 'Wands', nameCN: '权杖' },
  { name: 'Cups', nameCN: '圣杯' },
  { name: 'Swords', nameCN: '宝剑' },
  { name: 'Pentacles', nameCN: '星币' }
];

const RANKS = [
  { val: '01', name: 'Ace', nameCN: '王牌' },
  { val: '02', name: 'Two', nameCN: '二' },
  { val: '03', name: 'Three', nameCN: '三' },
  { val: '04', name: 'Four', nameCN: '四' },
  { val: '05', name: 'Five', nameCN: '五' },
  { val: '06', name: 'Six', nameCN: '六' },
  { val: '07', name: 'Seven', nameCN: '七' },
  { val: '08', name: 'Eight', nameCN: '八' },
  { val: '09', name: 'Nine', nameCN: '九' },
  { val: '10', name: 'Ten', nameCN: '十' },
  { val: '11', name: 'Page', nameCN: '侍从' },
  { val: '12', name: 'Knight', nameCN: '骑士' },
  { val: '13', name: 'Queen', nameCN: '王后' },
  { val: '14', name: 'King', nameCN: '国王' }
];

export const TAROT_DECK: TarotCard[] = [];

// --- BUILD DECK ---

// 1. Add Majors
MAJOR_CARDS_DICTIONARY.forEach((data) => {
    TAROT_DECK.push({
        id: data.id,
        name: data.en,
        nameCN: data.cn,
        image: `${BASE_URL}/${data.filename}`, // Exact filename from dictionary
        keywords: ["Major Arcana"],
        description: "A Major Arcana card representing significant life themes."
    });
});

// 2. Add Minors
let idCounter = 22;
SUITS.forEach((suit) => {
    RANKS.forEach((rank) => {
        // Construct filename based on screenshot: SuitName + TwoDigitNumber + .png
        // Example: Cups01.png, Swords11.png
        const filename = `${suit.name}${rank.val}.png`;
        
        TAROT_DECK.push({
            id: idCounter++,
            name: `${rank.name} of ${suit.name}`,
            nameCN: `${suit.nameCN}${rank.nameCN}`,
            image: `${BASE_URL}/${filename}`, 
            keywords: [suit.name, rank.name],
            description: `A card from the suit of ${suit.name}.`
        });
    });
});

export const SYSTEM_INSTRUCTION = `
You are an expert Tarot Reader with a mystical, empathetic, and slightly mysterious persona.
Your goal is to interpret a Tarot spread for a user based on their specific question.

Context:
- The user has drawn 3 cards representing: 1. Past/Context, 2. Present/Situation, 3. Future/Outcome.
- Some cards may be reversed (indicated in the input).

Output format:
- Use Markdown.
- Start with a short, mystical opening acknowledging the user's question.
- Analyze each card individually in the context of its position (Past, Present, Future).
- Provide a synthesis/summary of the cards together.
- End with a piece of actionable advice or a "fortune cookie" style wisdom.
- Keep the tone supportive but honest.
- If the question is about sensitive topics (medical, legal), provide a disclaimer.
`;