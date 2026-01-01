// components/admin/DeleteTeamMemberButton.tsx
// Delete button with confirmation for team members

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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