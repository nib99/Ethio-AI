import ConversationList from '@/components/chat/ConversationList';
import ChatWindow from '@/components/chat/ChatWindow';

export default function ConversationsPage() {
  return (
    <div className="h-full flex gap-6">
      <div className="w-96 bg-white border-r rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-xl">Conversations</h2>
        </div>
        <ConversationList />
      </div>

      <div className="flex-1 bg-white rounded-2xl shadow-sm flex flex-col">
        <ChatWindow />
      </div>
    </div>
  );
}
