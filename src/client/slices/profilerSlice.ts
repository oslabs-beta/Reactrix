import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProfilingData, IProfilingDataStore } from '../../interfaces';
import type { RootState } from '../store';

// we will receive an object with id, phase, and actualDuration
// when we are profiling a whole app, each component should have it's own profiler with corresponding unique ID
// therefore, we will create an object with key/value pairs where the key is the unique ID and the value is an object with phase and actual Duration
// if profiling data comes in where the ID already exists in the store, then that means that is a parent component which also reports the profiling data of its children
// we only want to keep the data with the larger actual duration which represents the parent components real actual duration

// Define the initial state using that type
// const initialState: Partial<IProfilingDataStore> = {};
const initialState: IProfilingDataStore = <IProfilingDataStore>{};

export const profilerSlice = createSlice({
  name: 'profiler',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    clearProfilerData: (state) => {
      console.log('clearing Profiler data');
      state = {};
    },
    storeProfilerData: (state, action: PayloadAction<IProfilingData>) => {
      console.log('this is action payload', action.payload);
      let { id } = action.payload;
      id = String(id);
      const { phase, actualDuration } = action.payload;
      
      const data = { phase, actualDuration };
      if (!state[id]) state[id] = data;
      else if ((state[id]?.actualDuration ?? 0) < (actualDuration ?? 0)) state[id] = data;
    },
  },
});

export const { clearProfilerData, storeProfilerData } = profilerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectProfilerData = (state: RootState) => state.profiler;
export const selectID = (state: RootState) => state.profiler.id;
export const selectPhase = (state: RootState) => state.profiler.phase;
export const selectActualDuration = (state: RootState) => state.profiler.actualDuration;

export default profilerSlice.reducer;