'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/db/supabase';

export default function ConversationList() {
  const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      const { data } = await supabase
        .from('conversations')
        .select('*')
        .order('created_at', { ascending: false });
      setConversations(data || []);
    };

    fetchConversations();
  }, []);

  return (
    <div className="divide-y">
      {conversations.map((conv) => (
        <div
          key={conv.id}
          className="p-4 hover:bg-gray-50 cursor-pointer transition"
        >
          <div className="font-medium">{conv.customer_name || 'Unknown Customer'}</div>
          <div className="text-sm text-gray-500 capitalize">{conv.platform}</div>
          <div className="text-xs text-gray-400 mt-1">
            {new Date(conv.created_at).toLocaleDateString('am-ET')}
          </div>
        </div>
      ))}
    </div>
  );
}
