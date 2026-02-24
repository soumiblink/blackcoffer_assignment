'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Card from '../ui/Card';
import { motion } from 'framer-motion';

interface DataPoint {
  _id: string;
  count: number;
}

interface Props {
  data: DataPoint[];
}

const COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316', '#84cc16'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-xl p-3 shadow-2xl">
        <p className="text-white font-semibold text-sm mb-1">{payload[0].name}</p>
        <p className="text-amber-400 text-sm">
          Count: <span className="font-bold">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function SectorDistribution({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <Card title="Sector Distribution">
        <div className="flex items-center justify-center h-[300px] text-gray-500">
          No data available
        </div>
      </Card>
    );
  }

  const chartData = data
    .filter(item => item._id && item.count > 0)
    .slice(0, 8)
    .map(item => ({
      name: item._id || 'Unknown',
      value: item.count,
    }));

  if (chartData.length === 0) {
    return (
      <Card title="Sector Distribution">
        <div className="flex items-center justify-center h-[300px] text-gray-500">
          No data available
        </div>
      </Card>
    );
  }

  return (
    <Card title="Sector Distribution">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <defs>
              {COLORS.map((color, index) => (
                <linearGradient key={index} id={`gradient${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.8}/>
                  <stop offset="100%" stopColor={color} stopOpacity={0.6}/>
                </linearGradient>
              ))}
            </defs>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => {
                const shortName = name.length > 12 ? name.substring(0, 10) + '...' : name;
                return `${shortName} ${(percent * 100).toFixed(0)}%`;
              }}
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
              animationDuration={800}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={`url(#gradient${index % COLORS.length})`}
                  stroke="#1e293b"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    </Card>
  );
}
