'use client';

import { useState, useEffect } from 'react';
import { getDashboardData } from '@/lib/api';
import { TrendingUp, Activity, Target, Database, Globe, MapPin, RefreshCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Navbar from '@/components/ui/Navbar';
import { motion } from 'framer-motion';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'];

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getDashboardData();
      if (response.success) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-gray-400">No data available</div>
        </div>
      </div>
    );
  }

  const stats = dashboardData.stats || {};
  const topSectors = dashboardData.sectorDistribution?.slice(0, 5) || [];
  const topRegions = dashboardData.regionDistribution?.slice(0, 5) || [];
  const topCountries = dashboardData.intensityByCountry?.slice(0, 10) || [];
  const yearTrends = dashboardData.trendsByYear?.slice(0, 10) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <Navbar />
      
      <main className="p-6 max-w-[1920px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-gray-400">Deep insights and data analysis</p>
          </div>
          <button
            onClick={fetchData}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh Data</span>
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-2xl shadow-blue-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Records</p>
                <p className="text-4xl font-bold text-white mt-1">
                  {stats.totalRecords?.toLocaleString() || 0}
                </p>
              </div>
              <Database className="w-12 h-12 text-white opacity-80" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl shadow-2xl shadow-green-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Avg Intensity</p>
                <p className="text-4xl font-bold text-white mt-1">
                  {stats.avgIntensity?.toFixed(2) || 0}
                </p>
              </div>
              <TrendingUp className="w-12 h-12 text-white opacity-80" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl shadow-2xl shadow-purple-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Avg Relevance</p>
                <p className="text-4xl font-bold text-white mt-1">
                  {stats.avgRelevance?.toFixed(2) || 0}
                </p>
              </div>
              <Target className="w-12 h-12 text-white opacity-80" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-2xl shadow-2xl shadow-orange-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Avg Likelihood</p>
                <p className="text-4xl font-bold text-white mt-1">
                  {stats.avgLikelihood?.toFixed(2) || 0}
                </p>
              </div>
              <Activity className="w-12 h-12 text-white opacity-80" />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 p-6 rounded-2xl shadow-2xl">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-blue-400" />
              Top Countries by Intensity
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart 
                data={topCountries.map((item: any) => ({ 
                  name: item._id.length > 15 ? item._id.substring(0, 15) + '...' : item._id, 
                  value: parseFloat(item.avgIntensity.toFixed(1)) 
                }))}
                margin={{ top: 5, right: 20, left: 10, bottom: 80 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={100}
                  tick={{ fontSize: 12, fill: '#9CA3AF' }}
                  interval={0}
                />
                <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '12px',
                    padding: '8px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 p-6 rounded-2xl shadow-2xl">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-purple-400" />
              Top Sectors
            </h3>
            <div className="space-y-4">
              {topSectors.map((sector: any, index: number) => {
                const total = topSectors.reduce((sum: number, s: any) => sum + s.count, 0);
                const percentage = ((sector.count / total) * 100).toFixed(1);
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-300">
                        {sector._id || 'Unknown'}
                      </span>
                      <span className="text-sm text-gray-400">
                        {sector.count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-3">
                      <div 
                        className="h-3 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: COLORS[index % COLORS.length]
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 p-6 rounded-2xl shadow-2xl mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">
            Intensity Trends by Year
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart 
              data={yearTrends.map((item: any) => ({ 
                year: item._id, 
                intensity: parseFloat(item.avgIntensity.toFixed(1)) 
              }))}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="year" 
                tick={{ fontSize: 12, fill: '#9CA3AF' }}
              />
              <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '12px',
                  padding: '8px',
                  color: '#fff'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="intensity" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 p-6 rounded-2xl shadow-2xl">
          <h3 className="text-lg font-semibold text-white mb-4">
            Top Regions by Data Volume
          </h3>
          <div className="space-y-4">
            {topRegions.slice(0, 8).map((region: any, index: number) => {
              const maxCount = topRegions[0]?.count || 1;
              const percentage = ((region.count / maxCount) * 100).toFixed(0);
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-300">
                      {region._id || 'Unknown'}
                    </span>
                    <span className="text-sm text-gray-400">
                      {region.count.toLocaleString()} records
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: COLORS[index % COLORS.length]
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
