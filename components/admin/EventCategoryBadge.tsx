// components/admin/EventCategoryBadge.tsx
// Badge component for event categories

export function EventCategoryBadge({ category }: { category: string }) {
  const colors: Record<string, string> = {
    BLOOD_DONATION: 'bg-red-100 text-red-800',
    VILLAGE_CAMP: 'bg-green-100 text-green-800',
    HEALTH_CHECKUP: 'bg-blue-100 text-blue-800',
    DONATION_DRIVE: 'bg-purple-100 text-purple-800',
    SHORT_EVENT: 'bg-slate-100 text-slate-800',
  };

  const labels: Record<string, string> = {
    BLOOD_DONATION: 'Blood Donation',
    VILLAGE_CAMP: 'Village Camp',
    HEALTH_CHECKUP: 'Health Checkup',
    DONATION_DRIVE: 'Donation Drive',
    SHORT_EVENT: 'Short Event',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
        colors[category] || 'bg-slate-100 text-slate-800'
      }`}
    >
      {labels[category] || category}
    </span>
  );
}
