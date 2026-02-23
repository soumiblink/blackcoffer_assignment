'use client';

import { useState, useEffect } from 'react';
import { getDashboardData } from '@/lib/api';
import { TrendingUp, TrendingDown, Activity, Target, Database, Globe, MapPin } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

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
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600">No data available</div>
      </div>
    );
  }

  const stats = dashboardData.stats || {};
  const topSectors = dashboardData.sectorDistribution?.slice(0, 5) || [];
  const topRegions = dashboardData.regionDistribution?.slice(0, 5) || [];
  const topCountries = dashboardData.intensityByCountry?.slice(0, 10) || [];
  const yearTrends = dashboardData.trendsByYear?.slice(0, 10) || [];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Analytics Dashboard</h1>
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Refresh Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Records</p>
              <p className="text-3xl font-bold mt-1">
                {stats.totalRecords?.toLocaleString() || 0}
              </p>
            </div>
            <Database className="w-12 h-12 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-lg shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Avg Intensity</p>
              <p className="text-3xl font-bold mt-1">
                {stats.avgIntensity?.toFixed(2) || 0}
              </p>
            </div>
            <TrendingUp className="w-12 h-12 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-lg shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Avg Relevance</p>
              <p className="text-3xl font-bold mt-1">
                {stats.avgRelevance?.toFixed(2) || 0}
              </p>
            </div>
            <Target className="w-12 h-12 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-lg shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Avg Likelihood</p>
              <p className="text-3xl font-bold mt-1">
                {stats.avgLikelihood?.toFixed(2) || 0}
              </p>
            </div>
            <Activity className="w-12 h-12 opacity-80" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <Globe className="w-5 h-5 mr-2" />
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
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={100}
                tick={{ fontSize: 12 }}
                interval={0}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '8px'
                }}
              />
              <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Top Sectors
          </h3>
          <div className="space-y-3">
            {topSectors.map((sector: any, index: number) => {
              const total = topSectors.reduce((sum: number, s: any) => sum + s.count, 0);
              const percentage = ((sector.count / total) * 100).toFixed(1);
              return (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {sector._id || 'Unknown'}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {sector.count} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full transition-all duration-500"
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

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
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
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="year" 
              tick={{ fontSize: 12 }}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '8px'
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

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Top Regions by Data Volume
        </h3>
        <div className="space-y-3">
          {topRegions.slice(0, 8).map((region: any, index: number) => {
            const maxCount = topRegions[0]?.count || 1;
            const percentage = ((region.count / maxCount) * 100).toFixed(0);
            return (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {region._id || 'Unknown'}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {region.count.toLocaleString()} records
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full transition-all duration-500"
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
  );
}
