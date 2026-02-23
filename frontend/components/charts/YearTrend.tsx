'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';
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
        <p className="text-white font-semibold text-sm mb-1">Year: {label}</p>
        <p className="text-cyan-400 text-sm">
          Intensity: <span className="font-bold">{payload[0].value.toFixed(2)}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function YearTrend({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <Card title="Year vs Intensity Trend">
        <div className="flex items-center justify-center h-[300px] text-gray-500">
          No data available
        </div>
      </Card>
    );
  }

  const chartData = data
    .filter(item => item._id && item.avgIntensity > 0)
    .map(item => ({
      year: item._id,
      intensity: parseFloat(item.avgIntensity.toFixed(2)),
    }))
    .sort((a, b) => parseInt(a.year) - parseInt(b.year));

  if (chartData.length === 0) {
    return (
      <Card title="Year vs Intensity Trend">
        <div className="flex items-center justify-center h-[300px] text-gray-500">
          No data available
        </div>
      </Card>
    );
  }

  return (
    <Card title="Year vs Intensity Trend">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <defs>
              <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.4}/>
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis 
              dataKey="year" 
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              stroke="#ffffff20"
            />
            <YAxis 
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              stroke="#ffffff20"
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="intensity"
              stroke="#06b6d4"
              strokeWidth={3}
              fill="url(#colorArea)"
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </Card>
  );
}
