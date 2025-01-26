import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import transactionsReducer from './transactionsSlice';
import budgetReducer from './budgetSlice';
import themeReducer from './themeSlice';
import goalsReducer from './goalsSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['transactions', 'budget', 'goals']
};

const rootReducer = combineReducers({
  transactions: transactionsReducer,
  budget: budgetReducer,
  theme: themeReducer,
  goals: goalsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);