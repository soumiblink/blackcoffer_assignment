'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Card from '../ui/Card';

interface DataPoint {
  _id: string;
  avgLikelihood: number;
  count: number;
}

interface Props {
  data: DataPoint[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-xl p-3 shadow-xl">
        <p className="text-white font-medium">{payload[0].payload.region}</p>
        <p className="text-cyan-400 text-sm">
          Likelihood: <span className="font-semibold">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function LikelihoodByRegion({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <Card title="Likelihood by Region">
        <div className="flex items-center justify-center h-[300px] text-gray-400">
          No data available
        </div>
      </Card>
    );
  }

  const chartData = data
    .filter(item => item._id && item.avgLikelihood > 0)
    .map(item => ({
      region: item._id.length > 20 ? item._id.substring(0, 17) + '...' : item._id,
      likelihood: parseFloat(item.avgLikelihood.toFixed(2)),
    }));

  if (chartData.length === 0) {
    return (
      <Card title="Likelihood by Region">
        <div className="flex items-center justify-center h-[300px] text-gray-400">
          No data available
        </div>
      </Card>
    );
  }

  return (
    <Card title="Likelihood by Region">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
          <XAxis 
            dataKey="region" 
            angle={-45} 
            textAnchor="end" 
            height={100} 
            fontSize={12}
            stroke="#94a3b8"
          />
          <YAxis stroke="#94a3b8" />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(6, 182, 212, 0.1)' }} />
          <Legend wrapperStyle={{ color: '#94a3b8' }} />
          <Bar 
            dataKey="likelihood" 
            fill="#06b6d4"
            radius={[8, 8, 0, 0]}
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
