import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [],
  categories: [
    { id: 'food', name: 'Food', type: 'expense' },
    { id: 'rent', name: 'Rent', type: 'expense' },
    { id: 'utilities', name: 'Utilities', type: 'expense' },
    { id: 'entertainment', name: 'Entertainment', type: 'expense' },
    { id: 'salary', name: 'Salary', type: 'income' },
    { id: 'freelance', name: 'Freelance', type: 'income' },
    { id: 'investments', name: 'Investments', type: 'income' },
  ],
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push({
        ...action.payload,
        id: Date.now().toString(),
        date: new Date().toISOString(),
      });
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );
    },
    editTransaction: (state, action) => {
      const index = state.transactions.findIndex(
        (transaction) => transaction.id === action.payload.id
      );
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
  },
});

export const { addTransaction, deleteTransaction, editTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;