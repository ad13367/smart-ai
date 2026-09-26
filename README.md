# Smart AI

A polished ChatGPT-style AI assistant built with Next.js, React, Tailwind CSS, and an OpenAI-compatible API.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Enable real AI responses

Create `.env.local`:

```bash
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-4o-mini
```

Without a key, the app runs in demo mode so the interface can be previewed immediately.

## Included

- Responsive dark chat interface
- Conversation sidebar and new-chat action
- Prompt suggestions
- Loading states and message actions
- Web-search toggle, attachments, and voice controls
- Server-side API route with demo fallback
