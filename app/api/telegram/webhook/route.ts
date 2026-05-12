import { NextRequest } from 'next/server';
import { supabase } from '@/lib/db/supabase';
import { generateResponse } from '@/lib/ai/gemini';

export async function POST(req: NextRequest) {
  const update = await req.json();
  
  if (!update.message) return Response.json({ ok: true });

  const { chat, text, from } = update.message;
  const businessId = "default-business-id"; // In production: map from bot token or config

  // Find or create conversation
  let { data: conversation } = await supabase
    .from('conversations')
    .select('id')
    .eq('platform', 'telegram')
    .eq('platform_id', chat.id.toString())
    .single();

  if (!conversation) {
    const { data: newConv } = await supabase
      .from('conversations')
      .insert({
        business_id: businessId,
        platform: 'telegram',
        platform_id: chat.id.toString(),
        customer_name: from.first_name,
      })
      .select()
      .single();
    conversation = newConv;
  }

  // Save user message
  await supabase.from('messages').insert({
    conversation_id: conversation.id,
    role: 'user',
    content: text,
  });

  // Get knowledge base context
  const { data: chunks } = await supabase
    .from('knowledge_chunks')
    .select('content')
    .eq('business_id', businessId)
    .limit(4);

  const reply = await generateResponse(text, chunks?.map(c => c.content) || [], 'am');

  // Save AI reply
  await supabase.from('messages').insert({
    conversation_id: conversation.id,
    role: 'assistant',
    content: reply,
  });

  // Send reply to Telegram
  await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chat.id,
      text: reply,
    }),
  });

  return Response.json({ ok: true });
}
