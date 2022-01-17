// import {
//   createContext,
//   useCallback,
//   useContext,
//   useImperativeHandle,
//   useRef,
//   useState,
// } from 'react';

// import { IProfilerContextData } from '../interfaces/interfaces';

// // input: 
// // id: any, // the "id" prop of the Profiler tree that has just committed
// // phase: string, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
// // actualDuration: number, // time spent rendering the committed update
// // baseDuration: number, // estimated time to render the entire subtree without memoization
// // startTime: number, // when React began rendering this update
// // commitTime: number, // when React committed this update
// // Profiler sends data from the children first
// export const ProfilerContext = createContext({} as IProfilerContextData);

// export function ProfilerContextProvider({
//   // these are arguments used to build the initial context
//   // I probably don't need this for storing data
//   children,
//   onExpandNodes,
//   treeRef,
//   data,
// }: ISidebarDrawerProps): JSX.Element {

//   return (
//     <ProfilerContext.Provider
//       value={{
//         draggingItemRef,
//         hierarchyRef,
//         hierarchy,
//         setHierarchy,
//       }}
//     >
//       {children}
//     </ProfilerContext.Provider>
//   );
// }

// export const useHierarchyData = (): IProfilerContextData => useContext(ProfilerContext);
