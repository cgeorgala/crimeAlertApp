import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import toastReducer from './toaster';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import authReducer from './auth';
import { rtkqToastMiddleware } from './middleware/apiNotification';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user'],
};

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: persistReducer(authPersistConfig, authReducer),
    toast: toastReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware).concat(rtkqToastMiddleware),
});
export const persistor = persistStore(store);