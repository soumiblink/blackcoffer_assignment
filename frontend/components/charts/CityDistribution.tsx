'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Card from '../ui/Card';

interface DataPoint {
  _id: string;
  count: number;
}

interface Props {
  data: DataPoint[];
}

export default function CityDistribution({ data }: Props) {
  const chartData = data.map(item => ({
    city: item._id,
    count: item.count,
  }));

  return (
    <Card title="City Distribution">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="city" angle={-45} textAnchor="end" height={100} fontSize={12} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#ec4899" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
