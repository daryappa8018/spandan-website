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

// ================================================================

// components/admin/DeleteEventButton.tsx
// Delete button with confirmation for events

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function DeleteEventButton({
  eventId,
  eventTitle,
}: {
  eventId: string;
  eventTitle: string;
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/events/${eventId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert('Failed to delete event');
      }
    } catch (error) {
      alert('An error occurred');
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="inline-flex items-center gap-2">
        <span className="text-xs text-slate-600">Delete?</span>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-xs text-red-600 hover:underline disabled:opacity-50"
        >
          {loading ? 'Deleting...' : 'Yes'}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          disabled={loading}
          className="text-xs text-slate-600 hover:underline"
        >
          No
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="text-sm text-red-600 hover:underline"
    >
      Delete
    </button>
  );
}

// ================================================================

// components/admin/FormField.tsx
// Reusable form field component

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'date';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  options?: { value: string; label: string }[];
  rows?: number;
}

export function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  placeholder,
  helpText,
  options,
  rows = 4,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-slate-700 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          rows={rows}
          className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3d3e65] focus:border-transparent"
        />
      ) : type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3d3e65] focus:border-transparent"
        >
          <option value="">Select {label}</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3d3e65] focus:border-transparent"
        />
      )}

      {helpText && (
        <p className="text-xs text-slate-500 mt-1">{helpText}</p>
      )}
    </div>
  );
}

// ================================================================

// DeleteProjectButton
export function DeleteProjectButton({
  projectId,
  projectTitle,
}: {
  projectId: string;
  projectTitle: string;
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/projects/${projectId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        router.refresh();
      } else {
        alert('Failed to delete project');
      }
    } catch (error) {
      alert('An error occurred');
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="inline-flex items-center gap-2">
        <span className="text-xs text-slate-600">Delete?</span>
        <button onClick={handleDelete} disabled={loading} className="text-xs text-red-600 hover:underline disabled:opacity-50">
          {loading ? 'Deleting...' : 'Yes'}
        </button>
        <button onClick={() => setShowConfirm(false)} disabled={loading} className="text-xs text-slate-600 hover:underline">
          No
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => setShowConfirm(true)} className="text-sm text-red-600 hover:underline">
      Delete
    </button>
  );
}

// ================================================================

// DeleteTeamMemberButton
export function DeleteTeamMemberButton({
  memberId,
  memberName,
}: {
  memberId: string;
  memberName: string;
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/team/${memberId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        router.refresh();
      } else {
        alert('Failed to delete team member');
      }
    } catch (error) {
      alert('An error occurred');
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="inline-flex items-center gap-2">
        <span className="text-xs text-slate-600">Delete?</span>
        <button onClick={handleDelete} disabled={loading} className="text-xs text-red-600 hover:underline disabled:opacity-50">
          {loading ? 'Deleting...' : 'Yes'}
        </button>
        <button onClick={() => setShowConfirm(false)} disabled={loading} className="text-xs text-slate-600 hover:underline">
          No
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => setShowConfirm(true)} className="text-sm text-red-600 hover:underline">
      Delete
    </button>
  );
}