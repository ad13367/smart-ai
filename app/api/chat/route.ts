import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { messages = [] } = await request.json();
  const last = messages[messages.length - 1]?.content || '';
  if (process.env.OPENAI_API_KEY) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({ model: process.env.OPENAI_MODEL || 'gpt-4o-mini', messages, temperature: 0.7 }),
    });
    const data = await response.json();
    return NextResponse.json({ message: data.choices?.[0]?.message?.content || 'No response received.' });
  }
  return NextResponse.json({ message: `I’m Smart AI, and I’d be happy to help with “${last}”. Add an OPENAI_API_KEY environment variable to enable real AI responses.` });
}
