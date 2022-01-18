// import { useProfilerData } from "../ProfilerContext";
import { useAppDispatch } from '../hooks'

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

export function useSendProfilerData(
  id: string, // the "id" prop of the Profiler tree that has just committed
  phase: string, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration: number, // time spent rendering the committed update
  baseDuration: number, // estimated time to render the entire subtree without memoization
  startTime: number, // when React began rendering this update
  commitTime: number, // when React committed this update
) {
  // Aggregate or log render timings...
  const dispatch = useAppDispatch();
  dispatch({type: 'storeProfilerData', payload: {id, phase, actualDuration}});
  console.log('this is id', id);
  console.log('this is phase', phase);
  console.log('this is actualDuration', actualDuration);
  console.log('this is baseDuration', baseDuration);
  console.log('this is startTime', startTime);
  console.log('this is commitTime', commitTime);
}