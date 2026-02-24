'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Card from '../ui/Card';

interface DataPoint {
  _id: string;
  avgRelevance: number;
  count: number;
}

interface Props {
  data: DataPoint[];
}

const COLORS = [
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#f59e0b', // amber
  '#10b981', // emerald
  '#3b82f6', // blue
  '#f97316', // orange
  '#06b6d4', // cyan
  '#84cc16', // lime
  '#6366f1', // indigo
  '#14b8a6', // teal
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-xl p-3 shadow-xl">
        <p className="text-white font-medium">{payload[0].name}</p>
        <p className="text-violet-400 text-sm">
          Relevance: <span className="font-semibold">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function RelevanceByTopic({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <Card title="Relevance by Topic">
        <div className="flex items-center justify-center h-[300px] text-gray-400">
          No data available
        </div>
      </Card>
    );
  }

  const chartData = data
    .filter(item => item._id && item.avgRelevance > 0)
    .slice(0, 10)
    .map(item => ({
      name: item._id || 'Unknown',
      value: parseFloat(item.avgRelevance.toFixed(2)),
    }));

  if (chartData.length === 0) {
    return (
      <Card title="Relevance by Topic">
        <div className="flex items-center justify-center h-[300px] text-gray-400">
          No data available
        </div>
      </Card>
    );
  }

  return (
    <Card title="Relevance by Topic">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => {
              const shortName = name.length > 12 ? name.substring(0, 10) + '...' : name;
              return `${shortName}: ${(percent * 100).toFixed(0)}%`;
            }}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
            paddingAngle={2}
            animationDuration={1000}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }}
            formatter={(value) => value.length > 20 ? value.substring(0, 20) + '...' : value}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
