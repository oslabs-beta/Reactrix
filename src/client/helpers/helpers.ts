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
        data: labels.map(() =>
          Math.floor(
            Math.random() * (Math.floor(1000) - Math.ceil(200) + 1) +
              Math.ceil(1000)
          )
        ),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Snapshot 2',
        data: labels.map(() =>
          Math.floor(
            Math.random() * (Math.floor(1000) - Math.ceil(200) + 1) +
              Math.ceil(1000)
          )
        ),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return data;
}

export function handleInitialData() {
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
        label: '',
        data: labels.map(() => 0),
        // borderColor: 'rgb(255, 99, 132)',
        // backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return data;
}
