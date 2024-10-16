import { createSlice } from "@reduxjs/toolkit";

const chosenDrinkSlice = createSlice({
  name: "chosenDrink",
  initialState: { drink: null },
  reducers: {
    setChosenDrink(state, action) {
      state.drink = action.payload.drink;
    },
    clearChosenDrink(state) {
      state.drink = null;
    },
  },
});

export const chosenDrinkActions = chosenDrinkSlice.actions;
export default chosenDrinkSlice.reducer;
