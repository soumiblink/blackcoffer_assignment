'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Card from '../ui/Card';
import { motion } from 'framer-motion';

interface DataPoint {
  _id: string;
  avgIntensity: number;
  count: number;
}

interface Props {
  data: DataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-xl p-3 shadow-2xl">
        <p className="text-white font-semibold text-sm mb-1">{label}</p>
        <p className="text-cyan-400 text-sm">
          Intensity: <span className="font-bold">{payload[0].value.toFixed(2)}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function IntensityByCountry({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <Card title="Intensity by Country">
        <div className="flex items-center justify-center h-[300px] text-gray-500">
          No data available
        </div>
      </Card>
    );
  }

  const chartData = data
    .filter(item => item._id && item.avgIntensity > 0)
    .slice(0, 15)
    .map(item => ({
      country: item._id.length > 20 ? item._id.substring(0, 17) + '...' : item._id,
      intensity: parseFloat(item.avgIntensity.toFixed(2)),
    }));

  if (chartData.length === 0) {
    return (
      <Card title="Intensity by Country">
        <div className="flex items-center justify-center h-[300px] text-gray-500">
          No data available
        </div>
      </Card>
    );
  }

  return (
    <Card title="Intensity by Country">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 80 }}>
            <defs>
              <linearGradient id="colorIntensity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.3}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis 
              dataKey="country" 
              angle={-45} 
              textAnchor="end" 
              height={100}
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              stroke="#ffffff20"
              interval={0}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              stroke="#ffffff20"
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff05' }} />
            <Bar 
              dataKey="intensity" 
              fill="url(#colorIntensity)" 
              radius={[8, 8, 0, 0]}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </Card>
  );
}
