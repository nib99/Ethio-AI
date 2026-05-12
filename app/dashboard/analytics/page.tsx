export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Analytics</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="font-semibold mb-6">Conversation Trends</h3>
          {/* You can integrate Recharts or Tremor here */}
          <div className="h-80 flex items-center justify-center text-gray-400">
            Chart Placeholder (Add Recharts)
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="font-semibold mb-6">Lead Conversion</h3>
          <div className="h-80 flex items-center justify-center text-gray-400">
            Funnel / Pie Chart Placeholder
          </div>
        </div>
      </div>
    </div>
  );
}
