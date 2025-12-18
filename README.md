# Mystic AI Tarot

A mystical, AI-powered Tarot reading application that combines ancient wisdom with modern technology.

## Features

*   **AI Interpretation**: Uses advanced LLM (via OpenAI client compatible API) to interpret card spreads based on your specific question.
*   **Immersive UI**: Mystical starry background, 3D card flipping animations, and atmospheric visual effects.
*   **Bilingual Support**: Full support for English and Chinese (Simplified), including interface and AI interpretations.
*   **Local Assets**: Optimized for local deployment with self-hosted fonts and styles, reducing external dependencies.
*   **Responsive Design**: Works beautifully on both desktop and mobile devices.

## Getting Started

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/JuliusJu572/Mystic_AI_Tarot.git
    cd Mystic_AI_Tarot
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure API Key:
    *   Open `services/geminiService.ts` (or configure via environment variables if set up).
    *   Currently configured to use `qwen3-max-preview` model via AiHubMix.

4.  Run the development server:
    ```bash
    npm run dev
    ```

5.  Open your browser and visit `http://localhost:3000`.

## Tech Stack

*   **Frontend**: React, TypeScript, Tailwind CSS
*   **AI Integration**: OpenAI SDK (configured for custom endpoint)
*   **Animations**: CSS3 Animations, custom keyframes
*   **Build Tool**: Vite

## License

This project is licensed under the MIT License.
