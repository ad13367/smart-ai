"use client";

import { FormEvent, useState } from 'react';
import { Bot, ChevronDown, Copy, FileText, Globe, Menu, Mic, Paperclip, Plus, Send, Sparkles, ThumbsDown, ThumbsUp, User, X } from 'lucide-react';

type Message = { role: 'user' | 'assistant'; content: string };

const suggestions = [
  { icon: '✦', title: 'Explain quantum computing', text: 'in simple terms' },
  { icon: '⌘', title: 'Write a professional email', text: 'for a job application' },
  { icon: '◈', title: 'Help me plan a trip', text: 'to Japan in spring' },
  { icon: '⌁', title: 'Brainstorm creative ideas', text: 'for my next project' },
];

const initialMessages: Message[] = [
  { role: 'assistant', content: 'Hello! I’m Smart AI. How can I help you today?' },
];

export default function SmartChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [sidebar, setSidebar] = useState(true);
  const [loading, setLoading] = useState(false);
  const [web, setWeb] = useState(false);

  async function sendMessage(event?: FormEvent) {
    event?.preventDefault();
    const value = input.trim();
    if (!value || loading) return;
    setInput('');
    setMessages((current) => [...current, { role: 'user', content: value }]);
    setLoading(true);
    try {
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: [...messages, { role: 'user', content: value }] }) });
      const data = await response.json();
      setMessages((current) => [...current, { role: 'assistant', content: data.message || 'I’m ready to help. What would you like to explore?' }]);
    } catch {
      setMessages((current) => [...current, { role: 'assistant', content: 'I’m having trouble connecting right now. Please try again in a moment.' }]);
    } finally { setLoading(false); }
  }

  function newChat() { setMessages(initialMessages); setInput(''); }

  return (
    <main className="flex h-screen overflow-hidden bg-[#08090d]">
      <aside className={`${sidebar ? 'w-[270px]' : 'w-0'} flex-shrink-0 overflow-hidden border-r border-white/[.07] bg-[#101116] transition-all duration-300`}>
        <div className="flex h-full w-[270px] flex-col p-3">
          <div className="mb-5 flex items-center justify-between px-2 pt-1"><div className="flex items-center gap-2"><div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500"><Sparkles size={16} /></div><span className="font-semibold tracking-tight">Smart AI</span></div><button onClick={() => setSidebar(false)} className="rounded-lg p-2 text-zinc-500 hover:bg-white/5 hover:text-white"><X size={17}/></button></div>
          <button onClick={newChat} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.06] px-3 py-2.5 text-sm text-zinc-200 transition hover:bg-white/10"><Plus size={17} /> New conversation <span className="ml-auto text-xs text-zinc-600">⌘ K</span></button>
          <p className="mb-2 mt-7 px-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-600">Today</p>
          <button className="w-full truncate rounded-lg bg-white/[.06] px-3 py-2 text-left text-sm text-zinc-300">Ideas for my next project</button>
          <button className="w-full truncate rounded-lg px-3 py-2 text-left text-sm text-zinc-500 hover:bg-white/5">Plan a trip to Japan</button>
          <p className="mb-2 mt-7 px-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-600">Yesterday</p>
          <button className="w-full truncate rounded-lg px-3 py-2 text-left text-sm text-zinc-500 hover:bg-white/5">Understanding quantum computing</button>
          <div className="mt-auto border-t border-white/[.07] pt-3"><button className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-white/5"><div className="grid h-8 w-8 place-items-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-300">JD</div><div className="min-w-0"><div className="truncate text-sm">Jordan Davis</div><div className="text-xs text-zinc-600">Free plan</div></div><ChevronDown size={15} className="ml-auto text-zinc-600" /></button></div>
        </div>
      </aside>
      <section className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[68px] items-center justify-between border-b border-white/[.07] px-5 sm:px-8"><div className="flex items-center gap-3">{!sidebar && <button onClick={() => setSidebar(true)} className="rounded-lg p-2 text-zinc-400 hover:bg-white/5"><Menu size={19}/></button>}<div><h1 className="text-[15px] font-medium text-zinc-200">New conversation</h1><p className="text-xs text-zinc-600">Smart AI · Online</p></div></div><button className="rounded-lg p-2 text-zinc-500 hover:bg-white/5"><MoreDots /></button></header>
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col overflow-y-auto px-5 py-10 sm:px-8">
          <div className="flex-1">
            {messages.map((message, index) => <MessageBubble key={index} message={message} />)}
            {loading && <div className="mb-8 flex gap-4"><div className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500"><Sparkles size={15}/></div><div className="flex items-center gap-1 pt-2"><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500"/><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500 [animation-delay:150ms]"/><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500 [animation-delay:300ms]"/></div></div>}
            {messages.length === 1 && <div className="mt-10 grid gap-3 sm:grid-cols-2">{suggestions.map((item) => <button key={item.title} onClick={() => setInput(`${item.title} ${item.text}`)} className="group rounded-2xl border border-white/[.08] bg-white/[.025] p-4 text-left transition hover:border-violet-500/40 hover:bg-violet-500/[.06]"><div className="mb-3 text-lg text-violet-300">{item.icon}</div><div className="text-sm text-zinc-300">{item.title}</div><div className="mt-1 text-xs text-zinc-600">{item.text}</div></button>)}</div>}
          </div>
          <form onSubmit={sendMessage} className="sticky bottom-0 mt-10"><div className="rounded-2xl border border-white/10 bg-[#15161c] p-2 shadow-2xl shadow-black/20 focus-within:border-violet-500/40"><textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); sendMessage(); } }} rows={1} placeholder="Message Smart AI..." className="max-h-32 min-h-[42px] w-full resize-none bg-transparent px-3 py-2 text-sm text-zinc-200 outline-none placeholder:text-zinc-600"/><div className="flex items-center justify-between px-1"><div className="flex gap-1"><button type="button" className="rounded-lg p-2 text-zinc-500 hover:bg-white/5 hover:text-zinc-300"><Paperclip size={17}/></button><button type="button" className="rounded-lg p-2 text-zinc-500 hover:bg-white/5 hover:text-zinc-300"><Mic size={17}/></button><button type="button" onClick={() => setWeb(!web)} className={`${web ? 'bg-blue-500/15 text-blue-300' : 'text-zinc-500'} flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs hover:bg-white/5`}><Globe size={15}/> Web search</button></div><button disabled={!input.trim() || loading} className="grid h-8 w-8 place-items-center rounded-lg bg-violet-600 text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-500"><Send size={15}/></button></div></div><p className="mt-3 text-center text-[11px] text-zinc-700">Smart AI can make mistakes. Check important information.</p></form>
        </div>
      </section>
    </main>
  );
}

function MessageBubble({ message }: { message: Message }) { return <div className="mb-8 flex gap-4"><div className={`grid h-8 w-8 flex-shrink-0 place-items-center rounded-xl ${message.role === 'assistant' ? 'bg-gradient-to-br from-violet-500 to-blue-500' : 'bg-amber-500/20 text-amber-300'}`}>{message.role === 'assistant' ? <Sparkles size={15}/> : <User size={15}/>}</div><div className="min-w-0 flex-1 pt-1"><div className="mb-2 text-xs font-medium text-zinc-500">{message.role === 'assistant' ? 'Smart AI' : 'You'}</div><p className="whitespace-pre-wrap text-[15px] leading-7 text-zinc-300">{message.content}</p>{message.role === 'assistant' && <div className="mt-3 flex gap-1"><button className="rounded-md p-1.5 text-zinc-600 hover:bg-white/5 hover:text-zinc-300"><Copy size={14}/></button><button className="rounded-md p-1.5 text-zinc-600 hover:bg-white/5 hover:text-zinc-300"><ThumbsUp size={14}/></button><button className="rounded-md p-1.5 text-zinc-600 hover:bg-white/5 hover:text-zinc-300"><ThumbsDown size={14}/></button></div>}</div></div> }
function MoreDots() { return <span className="flex gap-1"><i className="h-1 w-1 rounded-full bg-current"/><i className="h-1 w-1 rounded-full bg-current"/><i className="h-1 w-1 rounded-full bg-current"/></span> }
