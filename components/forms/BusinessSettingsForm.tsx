'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/db/supabase';
import { toast } from 'sonner';

export default function BusinessSettingsForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    primary_language: 'am',
    supported_languages: ['am', 'en'],
  });

  useEffect(() => {
    const fetchBusiness = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data } = await supabase
        .from('businesses')
        .select('*')
        .eq('owner_id', session.user.id)
        .single();

      if (data) {
        setFormData({
          name: data.name,
          primary_language: data.primary_language,
          supported_languages: data.supported_languages,
        });
      }
    };

    fetchBusiness();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('businesses')
      .update({
        name: formData.name,
        primary_language: formData.primary_language,
        supported_languages: formData.supported_languages,
      })
      .eq('name', formData.name); // Better to use business_id in production

    if (error) {
      toast.error('Failed to update settings');
    } else {
      toast.success('Settings updated successfully');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8 space-y-8">
      <div>
        <label className="block text-sm font-medium mb-2">Business Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-ethiopian-green"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Primary Language</label>
        <select
          value={formData.primary_language}
          onChange={(e) => setFormData({ ...formData, primary_language: e.target.value })}
          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-ethiopian-green"
        >
          <option value="am">Amharic (አማርኛ)</option>
          <option value="om">Afaan Oromoo</option>
          <option value="en">English</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-3">Supported Languages</label>
        <div className="flex gap-4">
          {['am', 'en', 'om'].map(lang => (
            <label key={lang} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.supported_languages.includes(lang)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData({
                      ...formData,
                      supported_languages: [...formData.supported_languages, lang]
                    });
                  } else {
                    setFormData({
                      ...formData,
                      supported_languages: formData.supported_languages.filter(l => l !== lang)
                    });
                  }
                }}
              />
              <span>{lang === 'am' ? 'Amharic' : lang === 'om' ? 'Afaan Oromoo' : 'English'}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-ethiopian-green text-white py-4 rounded-xl font-medium hover:bg-green-800 transition disabled:opacity-70"
      >
        {loading ? 'Saving...' : 'Save Settings'}
      </button>
    </form>
  );
}
