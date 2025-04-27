import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the state
interface TabState {
  activeTab: string | null; // activeTab can be a string or null
}

const initialState: TabState = {
  activeTab: null, // Default tab
};

export const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string | null>) => {
      state.activeTab = action.payload; // Update active tab
    },
  },
});

export const { setActiveTab } = tabSlice.actions;
export default tabSlice.reducer;
