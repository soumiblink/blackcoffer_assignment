'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Card from '../ui/Card';

interface DataPoint {
  _id: string;
  avgIntensity: number;
  count: number;
}

interface Props {
  data: DataPoint[];
}

export default function YearTrend({ data }: Props) {
  const chartData = data.map(item => ({
    year: item._id,
    intensity: parseFloat(item.avgIntensity.toFixed(2)),
  }));

  return (
    <Card title="Year vs Intensity Trend">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="intensity" stroke="#8b5cf6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
