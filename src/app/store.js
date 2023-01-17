import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice.js';
import cashierReducer from '../features/cashierSlice.js';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedCashierReducer = persistReducer(persistConfig, cashierReducer);
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    cashier: persistedCashierReducer
  },
  middleware: [thunk]
});

export const persistor = persistStore(store)
