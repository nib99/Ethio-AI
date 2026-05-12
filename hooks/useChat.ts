'use client';

import { useState } from 'react';

export function useChat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string, businessId: string, conversationId: string) => {
    setIsLoading(true);
    
    setMessages(prev => [...prev, { role: 'user', content }]);

    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: content, businessId, conversationId, language: 'am' }),
    });

    const data = await res.json();
    
    setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    setIsLoading(false);
  };

  return { messages, sendMessage, isLoading };
}
