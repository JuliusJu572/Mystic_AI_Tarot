export interface TarotCard {
  id: number;
  name: string;
  nameCN: string;
  image: string; // URL placeholder
  keywords: string[];
  description: string;
  isReversed?: boolean; // Determined during draw
}

export enum AppPhase {
  WELCOME = 'WELCOME',
  SHUFFLE = 'SHUFFLE',
  SELECTION = 'SELECTION',
  REVEALING = 'REVEALING',
  INTERPRETATION = 'INTERPRETATION'
}

export interface ReadingRequest {
  question: string;
  spreadType: 'three-card'; // Past, Present, Future
}

export interface HandPoint {
  x: number;
  y: number;
}
