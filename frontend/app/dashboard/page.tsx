'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { TrendingUp, Activity, Target, Zap } from 'lucide-react';
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
import { isAuthenticated } from '@/lib/auth';

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
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    loadDashboardData();
  }, [router]);

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
        // Update data with filtered results
        setData(response.data);
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative">
            <div className="w-16 h-16 border-4 border-white/10 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4" />
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin mx-auto blur-sm" style={{ animationDirection: 'reverse', animationDuration: '1s' }} />
          </div>
          <p className="text-gray-400 font-medium">Loading dashboard...</p>
        </motion.div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      
      <main className="p-8 max-w-[1920px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            Analytics Dashboard
          </h1>
          <p className="text-gray-400">
            Comprehensive data visualization and insights
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <StatCard
            title="Total Records"
            value={data.stats.totalRecords?.toLocaleString() || 0}
            icon={TrendingUp}
            color="bg-gradient-to-br from-cyan-500 to-cyan-600"
          />
          <StatCard
            title="Avg Intensity"
            value={data.stats.avgIntensity?.toFixed(2) || 0}
            icon={Activity}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatCard
            title="Avg Relevance"
            value={data.stats.avgRelevance?.toFixed(2) || 0}
            icon={Target}
            color="bg-gradient-to-br from-sky-500 to-sky-600"
          />
          <StatCard
            title="Avg Likelihood"
            value={data.stats.avgLikelihood?.toFixed(2) || 0}
            icon={Zap}
            color="bg-gradient-to-br from-indigo-500 to-indigo-600"
          />
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="lg:col-span-3 space-y-6"
          >
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="fixed top-24 right-8 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-6 py-3 rounded-2xl shadow-2xl z-50 flex items-center space-x-3"
              >
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="font-medium text-sm">Updating data...</span>
              </motion.div>
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <FilterPanel onFilterChange={handleFilterChange} />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
