import StatCard from '@/components/dashboard/StatCard';
import { supabase } from '@/lib/db/supabase';
import { cookies } from 'next/headers';

export default async function DashboardPage() {
  const cookieStore = cookies();
  // In real app, get business_id from session/profile

  const { data: stats } = await supabase
    .from('analytics')
    .select('*')
    .order('date', { ascending: false })
    .limit(1)
    .single();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Welcome back 👋</h1>
        <p className="text-gray-600 mt-2">Here's what's happening with your AI assistant today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Conversations" 
          value={stats?.conversations_count || 1243} 
          change="+18%" 
          icon="message" 
        />
        <StatCard 
          title="Leads Generated" 
          value={stats?.leads_count || 87} 
          change="+12%" 
          icon="users" 
        />
        <StatCard 
          title="Avg Response Time" 
          value="1.8s" 
          change="-0.4s" 
          icon="clock" 
        />
        <StatCard 
          title="Knowledge Base" 
          value="24 Docs" 
          change="+3" 
          icon="book" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold mb-4">Recent Conversations</h3>
          {/* Add ConversationList component here */}
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold mb-4">Latest Leads</h3>
          {/* Add LeadTable component here */}
        </div>
      </div>
    </div>
  );
}
