# EthioAI Bot

Ethiopian-first AI chatbot platform with multilingual support (Amharic, Afaan Oromoo, English), RAG knowledge base, and local payments.

## Tech Stack
- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind, shadcn/ui
- **Database**: Supabase + PostgreSQL + pgvector
- **AI**: Gemini 1.5 Pro + Embeddings
- **Integrations**: Telegram, WhatsApp Cloud API, Chapa

## Getting Started

```bash
git clone <repo>
cd ethioai-bot
cp .env.example .env.local
npm install
npm run dev
