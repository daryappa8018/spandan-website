// app/admin/impact/page.tsx
// Impact data editor - manage yearly statistics and summary

'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { FormField } from '@/components/admin/FormField';

interface YearData {
  id?: string;
  year: number;
  bdCamps: number;
  bdDonors: number;
  bdUnits: number;
  bdHospitals: number;
  vcCamps: number;
  vcVillages: number;
  vcParticipants: number;
  vcReferrals: number;
  hcCamps: number;
  hcScreenings: number;
  hcReferrals: number;
  ddDrives: number;
  ddItems: number;
  ddFamilies: number;
  seEvents: number;
  seParticipants: number;
}

interface Summary {
  yearsActive: number;
  totalEvents: number;
  peopleReached: string;
  volunteers: number;
}

export default function AdminImpactPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [summary, setSummary] = useState<Summary>({
    yearsActive: 2,
    totalEvents: 0,
    peopleReached: '0',
    volunteers: 0,
  });

  const [years, setYears] = useState<YearData[]>([]);
  const [editingYear, setEditingYear] = useState<number | null>(null);

  // Fetch impact data
  useEffect(() => {
    Promise.all([
      fetch('/api/admin/impact/summary').then((r) => r.json()),
      fetch('/api/admin/impact/years').then((r) => r.json()),
    ])
      .then(([summaryData, yearsData]) => {
        if (summaryData[0]) {
          setSummary({
            yearsActive: summaryData[0].yearsActive,
            totalEvents: summaryData[0].totalEvents,
            peopleReached: summaryData[0].peopleReached,
            volunteers: summaryData[0].volunteers,
          });
        }
        setYears(yearsData.sort((a: YearData, b: YearData) => b.year - a.year));
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load impact data');
        setLoading(false);
      });
  }, []);

  const handleSummaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSummary((prev) => ({
      ...prev,
      [name]: name === 'peopleReached' ? value : parseInt(value) || 0,
    }));
  };

  const handleYearChange = (year: number, field: string, value: string) => {
    setYears((prev) =>
      prev.map((y) =>
        y.year === year ? { ...y, [field]: parseInt(value) || 0 } : y
      )
    );
  };

  const addNewYear = () => {
    const currentYear = new Date().getFullYear();
    const newYear: YearData = {
      year: currentYear,
      bdCamps: 0,
      bdDonors: 0,
      bdUnits: 0,
      bdHospitals: 0,
      vcCamps: 0,
      vcVillages: 0,
      vcParticipants: 0,
      vcReferrals: 0,
      hcCamps: 0,
      hcScreenings: 0,
      hcReferrals: 0,
      ddDrives: 0,
      ddItems: 0,
      ddFamilies: 0,
      seEvents: 0,
      seParticipants: 0,
    };
    setYears([newYear, ...years]);
    setEditingYear(currentYear);
  };

  const saveSummary = async () => {
    setSaving(true);
    setError('');

    try {
      const response = await fetch('/api/admin/impact/summary', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(summary),
      });

      if (!response.ok) throw new Error('Failed to save summary');
      setSuccess('Summary saved!');
      setTimeout(() => setSuccess(''), 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const saveYear = async (yearData: YearData) => {
    setSaving(true);
    setError('');

    try {
      const response = await fetch('/api/admin/impact/years', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(yearData),
      });

      if (!response.ok) throw new Error('Failed to save year data');
      setSuccess(`${yearData.year} data saved!`);
      setEditingYear(null);
      setTimeout(() => setSuccess(''), 2000);
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
          <p className="text-slate-600">Loading impact data...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">
            Impact Data Management
          </h1>
          <p className="text-slate-600">
            Manage overall summary and yearly impact statistics.
          </p>
        </div>

        {/* Messages */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded mb-6">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Overall Summary */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Overall Summary
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Years Active"
              name="yearsActive"
              type="number"
              value={summary.yearsActive}
              onChange={handleSummaryChange}
            />
            <FormField
              label="Total Events"
              name="totalEvents"
              type="number"
              value={summary.totalEvents}
              onChange={handleSummaryChange}
            />
            <FormField
              label="People Reached"
              name="peopleReached"
              value={summary.peopleReached}
              onChange={handleSummaryChange}
              placeholder="e.g., 2,400+"
            />
            <FormField
              label="Active Volunteers"
              name="volunteers"
              type="number"
              value={summary.volunteers}
              onChange={handleSummaryChange}
            />
          </div>
          <button
            onClick={saveSummary}
            disabled={saving}
            className="mt-4 bg-[#3d3e65] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Summary'}
          </button>
        </div>

        {/* Yearly Data */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Yearly Data
            </h2>
            <button
              onClick={addNewYear}
              className="text-sm text-[#3d3e65] hover:underline"
            >
              + Add Year
            </button>
          </div>

          <div className="space-y-6">
            {years.map((yearData) => (
              <div
                key={yearData.year}
                className="border border-slate-200 rounded-lg p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {yearData.year}
                  </h3>
                  <button
                    onClick={() =>
                      setEditingYear(
                        editingYear === yearData.year ? null : yearData.year
                      )
                    }
                    className="text-sm text-[#3d3e65] hover:underline"
                  >
                    {editingYear === yearData.year ? 'Collapse' : 'Edit'}
                  </button>
                </div>

                {editingYear === yearData.year ? (
                  <div className="space-y-6">
                    {/* Blood Donation */}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700 mb-3">
                        Blood Donation Camps
                      </h4>
                      <div className="grid grid-cols-4 gap-3">
                        <input
                          type="number"
                          value={yearData.bdCamps}
                          onChange={(e) =>
                            handleYearChange(yearData.year, 'bdCamps', e.target.value)
                          }
                          placeholder="Camps"
                          className="px-3 py-2 border border-slate-300 rounded text-sm"
                        />
                        <input
                          type="number"
                          value={yearData.bdDonors}
                          onChange={(e) =>
                            handleYearChange(yearData.year, 'bdDonors', e.target.value)
                          }
                          placeholder="Donors"
                          className="px-3 py-2 border border-slate-300 rounded text-sm"
                        />
                        <input
                          type="number"
                          value={yearData.bdUnits}
                          onChange={(e) =>
                            handleYearChange(yearData.year, 'bdUnits', e.target.value)
                          }
                          placeholder="Units"
                          className="px-3 py-2 border border-slate-300 rounded text-sm"
                        />
                        <input
                          type="number"
                          value={yearData.bdHospitals}
                          onChange={(e) =>
                            handleYearChange(yearData.year, 'bdHospitals', e.target.value)
                          }
                          placeholder="Hospitals"
                          className="px-3 py-2 border border-slate-300 rounded text-sm"
                        />
                      </div>
                    </div>

                    {/* Village Camps */}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700 mb-3">
                        Village Camps
                      </h4>
                      <div className="grid grid-cols-4 gap-3">
                        <input
                          type="number"
                          value={yearData.vcCamps}
                          onChange={(e) =>
                            handleYearChange(yearData.year, 'vcCamps', e.target.value)
                          }
                          placeholder="Camps"
                          className="px-3 py-2 border border-slate-300 rounded text-sm"
                        />
                        <input
                          type="number"
                          value={yearData.vcVillages}
                          onChange={(e) =>
                            handleYearChange(yearData.year, 'vcVillages', e.target.value)
                          }
                          placeholder="Villages"
                          className="px-3 py-2 border border-slate-300 rounded text-sm"
                        />
                        <input
                          type="number"
                          value={yearData.vcParticipants}
                          onChange={(e) =>
                            handleYearChange(yearData.year, 'vcParticipants', e.target.value)
                          }
                          placeholder="Participants"
                          className="px-3 py-2 border border-slate-300 rounded text-sm"
                        />
                        <input
                          type="number"
                          value={yearData.vcReferrals}
                          onChange={(e) =>
                            handleYearChange(yearData.year, 'vcReferrals', e.target.value)
                          }
                          placeholder="Referrals"
                          className="px-3 py-2 border border-slate-300 rounded text-sm"
                        />
                      </div>
                    </div>

                    {/* Health Checkups */}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700 mb-3">
                        Health Checkup Camps
                      </h4>
                      <div className="grid grid-cols-3 gap-3">
                        <input
                          type="number"
                          value={yearData.hcCamps}
                          onChange={(e) =>
                            handleYearChange(yearData.year, 'hcCamps', e.target.value)
                          }
                          placeholder="Camps"
                          className="px-3 py-2 border border-slate-300 rounded text-sm"
                        />
                        <input
                          type="number"
                          value={yearData.hcScreenings}
                          onChange={(e) =>
                            handleYearChange(yearData.year, 'hcScreenings', e.target.value)
                          }
                          placeholder="Screenings"
                          className="px-3 py-2 border border-slate-300 rounded text-sm"
                        />
                        <input
                          type="number"
                          value={yearData.hcReferrals}
                          onChange={(e) =>
                            handleYearChange(yearData.year, 'hcReferrals', e.target.value)
                          }
                          placeholder="Referrals"
                          className="px-3 py-2 border border-slate-300 rounded text-sm"
                        />
                      </div>
                    </div>

                    {/* Donation Drives */}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700 mb-3">
                        Donation Drives
                      </h4>
                      <div className="grid grid-cols-3 gap-3">
                        <input
                          type="number"
                          value={yearData.ddDrives}
                          onChange={(e) =>
                            handleYearChange(yearData.year, 'ddDrives', e.target.value)
                          }
                          placeholder="Drives"
                          className="px-3 py-2 border border-slate-300 rounded text-sm"
                        />
                        <input
                          type="number"
                          value={yearData.ddItems}
                          onChange={(e) =>
                            handleYearChange(yearData.year, 'ddItems', e.target.value)
                          }
                          placeholder="Items"
                          className="px-3 py-2 border border-slate-300 rounded text-sm"
                        />
                        <input
                          type="number"
                          value={yearData.ddFamilies}
                          onChange={(e) =>
                            handleYearChange(yearData.year, 'ddFamilies', e.target.value)
                          }
                          placeholder="Families"
                          className="px-3 py-2 border border-slate-300 rounded text-sm"
                        />
                      </div>
                    </div>

                    {/* Short Events */}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700 mb-3">
                        Short Events
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="number"
                          value={yearData.seEvents}
                          onChange={(e) =>
                            handleYearChange(yearData.year, 'seEvents', e.target.value)
                          }
                          placeholder="Events"
                          className="px-3 py-2 border border-slate-300 rounded text-sm"
                        />
                        <input
                          type="number"
                          value={yearData.seParticipants}
                          onChange={(e) =>
                            handleYearChange(yearData.year, 'seParticipants', e.target.value)
                          }
                          placeholder="Participants"
                          className="px-3 py-2 border border-slate-300 rounded text-sm"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => saveYear(yearData)}
                      disabled={saving}
                      className="bg-[#3d3e65] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 disabled:opacity-50"
                    >
                      {saving ? 'Saving...' : `Save ${yearData.year}`}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-5 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500">BD Camps</p>
                      <p className="font-medium">{yearData.bdCamps}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Village Camps</p>
                      <p className="font-medium">{yearData.vcCamps}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Health Camps</p>
                      <p className="font-medium">{yearData.hcCamps}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Donations</p>
                      <p className="font-medium">{yearData.ddDrives}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Short Events</p>
                      <p className="font-medium">{yearData.seEvents}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}