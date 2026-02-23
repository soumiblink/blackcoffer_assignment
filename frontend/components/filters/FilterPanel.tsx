'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { getFilterOptions } from '@/lib/api';
import { useFilterStore } from '@/lib/store';

interface FilterOptions {
  endYears: string[];
  topics: string[];
  sectors: string[];
  regions: string[];
  pestles: string[];
  sources: string[];
  swots: string[];
  countries: string[];
  cities: string[];
}

interface FilterPanelProps {
  onFilterChange: () => void;
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [options, setOptions] = useState<FilterOptions | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const filters = useFilterStore();

  useEffect(() => {
    loadFilterOptions();
  }, []);

  const loadFilterOptions = async () => {
    try {
      const response = await getFilterOptions();
      setOptions(response.filters);
    } catch (error) {
      console.error('Error loading filter options:', error);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    filters.setFilter(key, value);
    onFilterChange();
  };

  const handleReset = () => {
    filters.resetFilters();
    onFilterChange();
  };

  if (!options) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-colors lg:hidden"
      >
        <Filter className="w-6 h-6" />
      </button>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${
          isOpen ? 'fixed inset-4 z-40 overflow-y-auto lg:relative lg:inset-auto' : 'hidden lg:block'
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleReset}
              className="text-sm text-primary-500 hover:text-primary-600"
            >
              Reset
            </button>
            {isOpen && (
              <button onClick={() => setIsOpen(false)} className="lg:hidden">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <FilterSelect
            label="End Year"
            value={filters.endYear}
            options={options.endYears}
            onChange={(value) => handleFilterChange('endYear', value)}
          />
          <FilterSelect
            label="Topic"
            value={filters.topic}
            options={options.topics}
            onChange={(value) => handleFilterChange('topic', value)}
          />
          <FilterSelect
            label="Sector"
            value={filters.sector}
            options={options.sectors}
            onChange={(value) => handleFilterChange('sector', value)}
          />
          <FilterSelect
            label="Region"
            value={filters.region}
            options={options.regions}
            onChange={(value) => handleFilterChange('region', value)}
          />
          <FilterSelect
            label="PESTLE"
            value={filters.pestle}
            options={options.pestles}
            onChange={(value) => handleFilterChange('pestle', value)}
          />
          <FilterSelect
            label="Source"
            value={filters.source}
            options={options.sources}
            onChange={(value) => handleFilterChange('source', value)}
          />
          <FilterSelect
            label="SWOT"
            value={filters.swot}
            options={options.swots}
            onChange={(value) => handleFilterChange('swot', value)}
          />
          <FilterSelect
            label="Country"
            value={filters.country}
            options={options.countries}
            onChange={(value) => handleFilterChange('country', value)}
          />
          <FilterSelect
            label="City"
            value={filters.city}
            options={options.cities}
            onChange={(value) => handleFilterChange('city', value)}
          />
        </div>
      </motion.div>
    </>
  );
}

interface FilterSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
