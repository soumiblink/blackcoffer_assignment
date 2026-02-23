import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface FilterParams {
  endYear?: string;
  topic?: string;
  sector?: string;
  region?: string;
  pestle?: string;
  source?: string;
  swot?: string;
  country?: string;
  city?: string;
}

export const getAllData = async () => {
  const response = await api.get('/data');
  return response.data;
};

export const getFilterOptions = async () => {
  const response = await api.get('/data/filters');
  return response.data;
};

export const getDashboardData = async () => {
  const response = await api.get('/data/dashboard');
  return response.data;
};

export const filterData = async (filters: FilterParams) => {
  const response = await api.post('/data/filter', filters);
  return response.data;
};

export default api;
