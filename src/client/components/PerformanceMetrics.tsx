import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Typography } from '@material-ui/core';

import { handleInitialData, handleUpdateData } from '../helpers/helpers';

type Props = {
  firstSnapshot: boolean;
  checked: boolean;
  handleCheck: any;
};

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2
    }
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right' as const
    },
    title: {
      display: false,
      text: 'Performance Metrics'
    }
  }
};

const labels = ['First Contentful Paint (FCP)', 'Largest Contentful Paint (LCP)', 'First Input Delay (FID)', 'Time to Interactive (TTI)', 'Total Blocking Time (TBT)'];

const data = {
  labels,
  datasets: [
    {
      label: 'Snapshot 1',
      data: labels.map(() => Math.floor(Math.random() * (Math.floor(1000) - Math.ceil(200) + 1) + Math.ceil(1000))),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)'
    }
  ]
};

export default function PerformanceMetrics({ firstSnapshot, checked }: Props) {
  return (
    <div>
      <Typography variant="h5">Performance Metrics</Typography>
      <Bar
        options={options}
        data={firstSnapshot && checked ? data : checked && !firstSnapshot ? handleUpdateData() : handleInitialData()}
        style={{
          maxHeight: '500px'
        }}
      />
    </div>
  );
}
