import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';

import { handleUpdateData } from '../helpers/helpers';

type Props = {
  checked: boolean;
  handleCheck: any;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right' as const,
    },
    title: {
      display: false,
      text: 'Performance Metrics',
    },
  },
};

const labels = [
  'First Contentful Paint (FCP)',
  'Largest Contentful Paint (LCP)',
  'First Input Delay (FID)',
  'Time to Interactive (TTI)',
  'Total Blocking Time (TBT)',
];

const data = {
  labels,
  datasets: [
    {
      label: 'Snapshot 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Snapshot 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function PerformanceMetrics({ checked }: Props) {
  return (
    <div>
      <Bar
        options={options}
        data={checked ? handleUpdateData() : data}
        style={{
          maxHeight: '500px',
        }}
      />
    </div>
  );
}
