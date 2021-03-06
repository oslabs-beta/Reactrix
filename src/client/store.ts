import { configureStore } from '@reduxjs/toolkit';
import profilerReducer from './slices/profilerSlice';

export const store = configureStore({
  reducer: {
    profiler: profilerReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {profiler: ProfilingData}
export type AppDispatch = typeof store.dispatch;
