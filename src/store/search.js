import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: { drinks: [] },
  reducers: {
    setDrinks(state, action) {
      state.drinks = action.payload.drinks;
    },
    cleanSearch(state) {
      state.drinks = [];
    },
  },
});

export const searchActions = searchSlice.actions;
export default searchSlice.reducer;
