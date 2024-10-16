import { createSlice } from "@reduxjs/toolkit";

const randomDrinkSlice = createSlice({
  name: "randomDrink",
  initialState: { drink: null },
  reducers: {
    setRandomDrink(state, action) {
      state.drink = action.payload.drink;
    },
  },
});

export const randomDrinkActions = randomDrinkSlice.actions;
export default randomDrinkSlice.reducer;
