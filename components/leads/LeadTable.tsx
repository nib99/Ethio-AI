'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/db/supabase';

export default function LeadTable() {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    const fetchLeads = async () => {
      const { data } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      setLeads(data || []);
    };

    fetchLeads();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Phone</th>
            <th className="px-6 py-4 text-left">Source</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-left">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium">{lead.name || '—'}</td>
              <td className="px-6 py-4">{lead.phone}</td>
              <td className="px-6 py-4 capitalize">{lead.source}</td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  lead.status === 'new' ? 'bg-blue-100 text-blue-700' : 
                  lead.status === 'qualified' ? 'bg-green-100 text-green-700' : 'bg-gray-100'
                }`}>
                  {lead.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(lead.created_at).toLocaleDateString('am-ET')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
