import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProfilingData } from '../../interfaces';
import type { RootState } from '../store';

// Define the initial state using that type
const initialState: IProfilingData = {
  id: null,
  phase: null,
  actualDuration: null
};

export const profilerSlice = createSlice({
  name: 'profiler',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    clearProfilerData: (state) => {
      console.log('clearing Profiler data');
      state.id = null;
      state.phase = null;
      state.actualDuration = null;
    },
    storeProfilerData: (state, action: PayloadAction<IProfilingData>) => {
      console.log('this is action payload', action.payload);
      state.id = action.payload.id;
      state.phase = action.payload.phase;
      state.actualDuration = action.payload.actualDuration;
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