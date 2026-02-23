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

export default function LikelihoodByRegion({ data }: Props) {
  const chartData = data.map(item => ({
    region: item._id,
    likelihood: parseFloat(item.avgLikelihood.toFixed(2)),
  }));

  return (
    <Card title="Likelihood by Region">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="region" angle={-45} textAnchor="end" height={100} fontSize={12} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="likelihood" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
