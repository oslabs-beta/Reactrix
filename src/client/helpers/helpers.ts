import faker from 'faker';

export function handleUpdateData() {
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
  return data;
}
