// app/admin/settings/page.tsx
// Site settings management - contact info, social media, etc.

'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { FormField } from '@/components/admin/FormField';

interface Settings {
  site_email: string;
  site_phone: string;
  site_location: string;
  office_hours: string;
  instagram_handle: string;
  linkedin_url: string;
  founded_year: string;
}

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [settings, setSettings] = useState<Settings>({
    site_email: '',
    site_phone: '',
    site_location: '',
    office_hours: '',
    instagram_handle: '',
    linkedin_url: '',
    founded_year: '',
  });

  // Fetch settings on load
  useEffect(() => {
    setLoading(true);
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        // Convert array to object
        const settingsObj = data.reduce((acc: any, item: any) => {
          acc[item.key] = item.value;
          return acc;
        }, {});
        setSettings(settingsObj);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load settings');
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      setSuccess('Settings saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-slate-600">Loading settings...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">
            Site Settings
          </h1>
          <p className="text-slate-600">
            Manage contact information, social media, and other site-wide settings.
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded mb-6">
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Contact Information */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Contact Information
            </h2>
            <div className="space-y-4">
              <FormField
                label="Email Address"
                name="site_email"
                type="email"
                value={settings.site_email}
                onChange={handleChange}
                placeholder="spandan@college.edu"
                helpText="Main contact email for the organization"
              />

              <FormField
                label="Phone Number"
                name="site_phone"
                value={settings.site_phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                helpText="Contact phone number"
              />

              <FormField
                label="Location/Address"
                name="site_location"
                type="textarea"
                value={settings.site_location}
                onChange={handleChange}
                rows={3}
                placeholder="Student Activities Office, Room 204, Main Building"
                helpText="Full address or location details"
              />

              <FormField
                label="Office Hours"
                name="office_hours"
                value={settings.office_hours}
                onChange={handleChange}
                placeholder="Monday - Friday: 2:00 PM - 5:00 PM"
                helpText="When the office is available"
              />
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Social Media
            </h2>
            <div className="space-y-4">
              <FormField
                label="Instagram Handle"
                name="instagram_handle"
                value={settings.instagram_handle}
                onChange={handleChange}
                placeholder="@spandan_club"
                helpText="Instagram username (include @ symbol)"
              />

              <FormField
                label="LinkedIn URL"
                name="linkedin_url"
                value={settings.linkedin_url}
                onChange={handleChange}
                placeholder="https://linkedin.com/company/spandan"
                helpText="Full LinkedIn company page URL"
              />
            </div>
          </div>

          {/* General Information */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              General Information
            </h2>
            <div className="space-y-4">
              <FormField
                label="Founded Year"
                name="founded_year"
                value={settings.founded_year}
                onChange={handleChange}
                placeholder="2023"
                helpText="Year the organization was established"
              />
            </div>
          </div>

          {/* Partners Management */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Partner Organizations
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Manage institutional partners displayed on impact page
                </p>
              </div>
              <a
                href="/admin/settings/partners"
                className="text-sm text-[#3d3e65] hover:underline"
              >
                Manage Partners →
              </a>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="bg-[#3d3e65] text-white px-8 py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            💡 <strong>Note:</strong> These settings are used throughout the public website. 
            Changes take effect immediately after saving.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}