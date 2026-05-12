'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

export default function ChatWindow() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    // Implementation with API call
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    // Call /api/ai/chat
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-ethiopian-green text-white' : 'bg-gray-100'}`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2"
            placeholder="መልእክት ይጻፉ..."
          />
          <button onClick={sendMessage} className="bg-ethiopian-green text-white p-2 rounded-lg">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
