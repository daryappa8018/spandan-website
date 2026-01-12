// components/gallery/GalleryFilters.tsx
'use client';

import { useState } from 'react';

export interface FilterOptions {
  category: string;
  year: string;
  reference: string;
}

interface GalleryFiltersProps {
  categories: string[];
  years: number[];
  references: { name: string; id: string }[];
  onFilterChange: (filters: FilterOptions) => void;
  showReferenceFilter?: boolean;
}

export default function GalleryFilters({
  categories,
  years,
  references,
  onFilterChange,
  showReferenceFilter = true,
}: GalleryFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    year: 'all',
    reference: 'all',
  });

  const updateFilter = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = { category: 'all', year: 'all', reference: 'all' };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== 'all');

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Reset All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            value={filters.category}
            onChange={(e) => updateFilter('category', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0) + cat.slice(1).toLowerCase().replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Year Filter */}
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
            Year
          </label>
          <select
            id="year"
            value={filters.year}
            onChange={(e) => updateFilter('year', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Years</option>
            {years.sort((a, b) => b - a).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Reference Filter (Event/Team/Project) */}
        {showReferenceFilter && references.length > 0 && (
          <div>
            <label htmlFor="reference" className="block text-sm font-medium text-gray-700 mb-2">
              Event/Team/Project
            </label>
            <select
              id="reference"
              value={filters.reference}
              onChange={(e) => updateFilter('reference', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All</option>
              {references.map((ref) => (
                <option key={ref.id} value={ref.id}>
                  {ref.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
