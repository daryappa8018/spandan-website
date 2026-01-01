// app/admin/settings/page.tsx
// Settings page - TODO

import { requireAuth } from '@/lib/auth-utils';
import AdminLayout from '../AdminLayout';

export default async function SettingsPage() {
  await requireAuth();

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 mb-2">Settings</h1>
        <p className="text-slate-600">Site configuration - Coming soon</p>
      </div>
    </AdminLayout>
  );
}