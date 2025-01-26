import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  monthlyBudget: 0,
  categories: {},
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    setMonthlyBudget: (state, action) => {
      state.monthlyBudget = action.payload;
    },
    setCategoryBudget: (state, action) => {
      state.categories[action.payload.category] = action.payload.amount;
    },
  },
});

export const { setMonthlyBudget, setCategoryBudget } = budgetSlice.actions;
export default budgetSlice.reducer;