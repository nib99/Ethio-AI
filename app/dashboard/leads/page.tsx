import LeadTable from '@/components/leads/LeadTable';

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Leads</h1>
        <button className="bg-ethiopian-green text-white px-6 py-2.5 rounded-xl font-medium">
          Export CSV
        </button>
      </div>
      <LeadTable />
    </div>
  );
}
