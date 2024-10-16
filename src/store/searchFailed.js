import { createSlice } from "@reduxjs/toolkit";

const searchFailedSlice = createSlice({
  name: "searchFailed",
  initialState: { searchFailed: null },
  reducers: {
    setSearchFailed(state) {
      state.searchFailed = true;
    },
    clearSearchFailed(state) {
      state.searchFailed = null;
    },
  },
});

export const searchFailedActions = searchFailedSlice.actions;
export default searchFailedSlice.reducer;
