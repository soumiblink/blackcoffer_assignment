'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown } from 'lucide-react';
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

  const activeFiltersCount = Object.values(filters).filter(v => v && v !== '').length;

  if (!options) return null;

  return (
    <>
      {/* Mobile Filter Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all lg:hidden"
      >
        <Filter className="w-6 h-6" />
        {activeFiltersCount > 0 && (
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
            {activeFiltersCount}
          </span>
        )}
      </motion.button>

      {/* Filter Panel */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className={`
            bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6
            ${isOpen ? 'fixed inset-4 z-40 overflow-y-auto lg:relative lg:inset-auto' : 'hidden lg:block'}
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">
                Filters
              </h3>
              {activeFiltersCount > 0 && (
                <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-xs font-medium rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {activeFiltersCount > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                >
                  Reset
                </motion.button>
              )}
              {isOpen && (
                <button
                  onClick={() => setIsOpen(false)}
                  className="lg:hidden text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Filters */}
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
      </AnimatePresence>
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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <label className="block text-sm font-medium text-gray-400 mb-2">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full px-4 py-2.5
            bg-white/5 backdrop-blur-xl
            border border-white/10
            rounded-xl
            focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent
            text-white text-sm
            transition-all duration-200
            hover:bg-white/[0.07] hover:border-white/20
            appearance-none
            cursor-pointer
          "
        >
          <option value="" className="bg-slate-900">All</option>
          {options.map((option) => (
            <option key={option} value={option} className="bg-slate-900">
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
    </motion.div>
  );
}
