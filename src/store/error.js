import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: { error: false },
  reducers: {
    setError(state) {
      state.error = !state.error;
    },
  },
});

export const errorActions = errorSlice.actions;
export default errorSlice.reducer;
