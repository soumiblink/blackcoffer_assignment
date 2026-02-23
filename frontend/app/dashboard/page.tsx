'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Activity, Target, Zap } from 'lucide-react';
import Sidebar from '@/components/ui/Sidebar';
import Navbar from '@/components/ui/Navbar';
import StatCard from '@/components/ui/StatCard';
import FilterPanel from '@/components/filters/FilterPanel';
import IntensityByCountry from '@/components/charts/IntensityByCountry';
import LikelihoodByRegion from '@/components/charts/LikelihoodByRegion';
import RelevanceByTopic from '@/components/charts/RelevanceByTopic';
import YearTrend from '@/components/charts/YearTrend';
import CityDistribution from '@/components/charts/CityDistribution';
import SectorDistribution from '@/components/charts/SectorDistribution';
import RegionDistribution from '@/components/charts/RegionDistribution';
import { getDashboardData, filterData } from '@/lib/api';
import { useFilterStore } from '@/lib/store';

interface DashboardData {
  intensityByCountry: any[];
  relevanceByTopic: any[];
  likelihoodByRegion: any[];
  trendsByYear: any[];
  cityDistribution: any[];
  sectorDistribution: any[];
  regionDistribution: any[];
  stats: {
    totalRecords: number;
    avgIntensity: number;
    avgRelevance: number;
    avgLikelihood: number;
  };
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const filters = useFilterStore();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const response = await getDashboardData();
      setData(response.data);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = async () => {
    try {
      setLoading(true);
      const filterParams = {
        endYear: filters.endYear || undefined,
        topic: filters.topic || undefined,
        sector: filters.sector || undefined,
        region: filters.region || undefined,
        pestle: filters.pestle || undefined,
        source: filters.source || undefined,
        swot: filters.swot || undefined,
        country: filters.country || undefined,
        city: filters.city || undefined,
      };

      const hasFilters = Object.values(filterParams).some(v => v !== undefined);

      if (hasFilters) {
        const response = await filterData(filterParams);
        setData({ ...data!, ...response.data });
      } else {
        await loadDashboardData();
      }
    } catch (error) {
      console.error('Error filtering data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Navbar />
        
        <main className="flex-1 p-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive data visualization and insights
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Records"
              value={data.stats.totalRecords?.toLocaleString() || 0}
              icon={TrendingUp}
              color="bg-blue-500"
            />
            <StatCard
              title="Avg Intensity"
              value={data.stats.avgIntensity?.toFixed(2) || 0}
              icon={Activity}
              color="bg-green-500"
            />
            <StatCard
              title="Avg Relevance"
              value={data.stats.avgRelevance?.toFixed(2) || 0}
              icon={Target}
              color="bg-orange-500"
            />
            <StatCard
              title="Avg Likelihood"
              value={data.stats.avgLikelihood?.toFixed(2) || 0}
              icon={Zap}
              color="bg-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-6">
              {loading && (
                <div className="fixed top-20 right-6 bg-primary-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
                  Updating...
                </div>
              )}

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <IntensityByCountry data={data.intensityByCountry} />
                <LikelihoodByRegion data={data.likelihoodByRegion} />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <RelevanceByTopic data={data.relevanceByTopic} />
                <SectorDistribution data={data.sectorDistribution} />
              </div>

              <YearTrend data={data.trendsByYear} />

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <CityDistribution data={data.cityDistribution} />
                <RegionDistribution data={data.regionDistribution} />
              </div>
            </div>

            <div className="lg:col-span-1">
              <FilterPanel onFilterChange={handleFilterChange} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
