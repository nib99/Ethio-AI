import BusinessSettingsForm from '@/components/forms/BusinessSettingsForm';

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Business Settings</h1>
        <p className="text-gray-600">Manage your business profile and AI preferences</p>
      </div>
      
      <BusinessSettingsForm />
    </div>
  );
}
