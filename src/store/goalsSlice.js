import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  goals: [],
};

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    addGoal: (state, action) => {
      state.goals.push({
        ...action.payload,
        id: Date.now().toString(),
        currentAmount: 0,
        createdAt: new Date().toISOString(),
      });
    },
    updateGoalProgress: (state, action) => {
      const goal = state.goals.find((g) => g.id === action.payload.id);
      if (goal) {
        goal.currentAmount = action.payload.amount;
      }
    },
    deleteGoal: (state, action) => {
      state.goals = state.goals.filter((goal) => goal.id !== action.payload);
    },
  },
});

export const { addGoal, updateGoalProgress, deleteGoal } = goalsSlice.actions;
export default goalsSlice.reducer;