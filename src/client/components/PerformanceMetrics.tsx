import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Box, Typography } from '@material-ui/core';

import { useAppSelector } from '../hooks';
import { selectProfilerData } from '../slices/profilerSlice';

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

export default function PerformanceMetrics(props: any) {
  const { checked, allSnapshots } = props;
  const profilerData = useAppSelector(selectProfilerData);

  const labels = [],
    datasetData = [];
  for (let i = profilerData.length - 1; i > -1; i--) {
    labels.push(profilerData[i].id);
    datasetData.push(profilerData[i].actualDuration);
  }

  const generateLightColorRgb = () => {
    const red = Math.floor(((1 + Math.random()) * 256) / 2);
    const green = Math.floor(((1 + Math.random()) * 256) / 2);
    const blue = Math.floor(((1 + Math.random()) * 256) / 2);
    return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Current Snapshot',
        data: datasetData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      }
    ]
  };

  if (checked) {
    for (const index of checked) {
      const checkedSetData = [];
      for (let i = allSnapshots[index].profilingData.length - 1; i > -1; i--) {
        checkedSetData.push(allSnapshots[index].profilingData[i].actualDuration);
      }
      const checkedData = {
        label: `Snapshot ${index + 1}`,
        data: checkedSetData,
        borderColor: generateLightColorRgb(),
        backgroundColor: generateLightColorRgb()
      };
      data.datasets = [...data.datasets, checkedData];
    }
  }

  return (
    <div>
      <Typography variant="h6">Performance Metrics</Typography>
      <Box m={2} mt={5}>
        <Bar
          options={options}
          data={data}
          style={{
            maxHeight: '500px'
          }}
        />
      </Box>
    </div>
  );
}
