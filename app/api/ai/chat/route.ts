import { NextRequest } from 'next/server';
import { generateResponse, generateEmbedding } from '@/lib/ai/gemini';
import { createClient } from '@/lib/db/supabase';

export async function POST(req: NextRequest) {
  try {
    const { message, businessId, conversationId, language = 'am' } = await req.json();

    const supabase = createClient();

    // Save user message
    await supabase.from('messages').insert({
      conversation_id: conversationId,
      role: 'user',
      content: message
    });

    // Generate embedding for semantic search
    const queryEmbedding = await generateEmbedding(message);

    // Real similarity search
    const { data: chunks } = await supabase.rpc('match_knowledge_chunks', {
      query_embedding: queryEmbedding,
      match_threshold: 0.78,
      match_count: 6,
      business_uuid: businessId
    });

    const context = chunks?.map((c: any) => c.content) || [];

    const reply = await generateResponse(message, context, language);

    // Save assistant reply
    const { data: assistantMsg } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        role: 'assistant',
        content: reply
      })
      .select()
      .single();

    return Response.json({ reply, messageId: assistantMsg.id });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
