import { create } from 'zustand';

interface FilterState {
  endYear: string;
  topic: string;
  sector: string;
  region: string;
  pestle: string;
  source: string;
  swot: string;
  country: string;
  city: string;
  setFilter: (key: string, value: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  endYear: '',
  topic: '',
  sector: '',
  region: '',
  pestle: '',
  source: '',
  swot: '',
  country: '',
  city: '',
  setFilter: (key, value) => set((state) => ({ ...state, [key]: value })),
  resetFilters: () => set({
    endYear: '',
    topic: '',
    sector: '',
    region: '',
    pestle: '',
    source: '',
    swot: '',
    country: '',
    city: '',
  }),
}));
