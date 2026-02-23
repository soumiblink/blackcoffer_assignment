'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Card from '../ui/Card';

interface DataPoint {
  _id: string;
  avgIntensity: number;
  count: number;
}

interface Props {
  data: DataPoint[];
}

export default function IntensityByCountry({ data }: Props) {
  const chartData = data.map(item => ({
    country: item._id,
    intensity: parseFloat(item.avgIntensity.toFixed(2)),
  }));

  return (
    <Card title="Intensity by Country">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="country" angle={-45} textAnchor="end" height={100} fontSize={12} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="intensity" fill="#0ea5e9" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
