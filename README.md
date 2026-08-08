# 🎮 Word Guess Master

An interactive word-guessing puzzle game — built with TypeScript and powered by Google's Gemini API through AI Studio.

`TypeScript` `Gemini API` `Vite` `AI Studio`

🔗 **Live demo:** https://word-guess-master.vercel.app

---

## ✨ What it does

- A word-guessing puzzle game where players try to guess the correct word.
- Uses the **Gemini API** to power gameplay logic (e.g. generating clues, checking guesses, or dynamic word selection).
- Fast, lightweight frontend built with **Vite** + TypeScript.

## 🛠️ Tech Stack

- **TypeScript** — core language
- **Vite** — build tool & dev server
- **Gemini API** — AI-powered game logic
- Built via **Google AI Studio**
- Deployed on **Vercel**

## 📁 Project structure

.
├── src/ # game logic & UI components
├── index.html # entry point
├── metadata.json # AI Studio app metadata
├── vite.config.ts # Vite build config
├── package.json # dependencies
└── .env.example # example environment variables

## 🚀 Run it locally

**Prerequisites:** Node.js

```bash
git clone https://github.com/anjalirangi002/game.git
cd game
npm install
```

Set your `GEMINI_API_KEY` in a `.env.local` file:

Then run:
```bash
npm run dev
```

## 📄 License

All rights reserved.
