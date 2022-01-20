import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProfilingData } from '../../interfaces';
import type { RootState } from '../store';

// Define the initial state using that type
const initialState: IProfilingData[] = [];

export const profilerSlice = createSlice({
  name: 'profiler',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    clearProfilerData: (state) => {
      state = [];
      return state;
    },
    storeProfilerData: (state, action: PayloadAction<IProfilingData>) => {      
      const { id, phase, actualDuration } = action.payload;
      const data = { id, phase, actualDuration };
      if (phase === 'mount') state.push(data);
    },
  },
});

export const { clearProfilerData, storeProfilerData } = profilerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectProfilerData = (state: RootState) => state.profiler;

export default profilerSlice.reducer;