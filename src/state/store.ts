import { configureStore } from '@reduxjs/toolkit';
import tabReducer from '../features/tabSlice';

export const store = configureStore({
  reducer: {
    activeTab: tabReducer,
  },
});

// These types help throughout your app (especially in hooks)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
