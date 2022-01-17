import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { IProfilerContextData, IProfilingData } from '../interfaces/index';

// input: 
// id: any, // the "id" prop of the Profiler tree that has just committed
// phase: string, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
// actualDuration: number, // time spent rendering the committed update
// baseDuration: number, // estimated time to render the entire subtree without memoization
// startTime: number, // when React began rendering this update
// commitTime: number, // when React committed this update
// Profiler sends data from the children first
export const ProfilerContext = createContext({} as IProfilerContextData);

export function ProfilerContextProvider(children: ReactNode): JSX.Element {
  const [profilingData, _setProfilingData] = useState<IProfilingData>({
    id: null,
    phase: null,
    actualDuration: null
  });

  const profilingDataRef = useRef<IProfilingData>(profilingData);
  const setProfilingData = (profilingData: IProfilingData) => {
    profilingDataRef.current = profilingData;
    _setProfilingData(profilingData);
  }

  // declare value as an object here so that ProfilerContext.Provider doesn't force a re-render of every consumer upon change to value's properties
  const value = {
    profilingData,
    setProfilingData,
  }

  console.log('this is profilerContext value', value);
  return (
    <ProfilerContext.Provider value={value}>
      {children}
    </ProfilerContext.Provider>
  );
}

export const useProfilerData = (): IProfilerContextData => useContext(ProfilerContext);