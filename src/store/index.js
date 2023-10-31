import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from './reducers';
import { api } from '../api/index';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { createLogger } from 'redux-logger'; // Import createLogger as a named export

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [],
    debug: process.env.NODE_ENV === 'development',
};

const persistedReducer = persistReducer(persistConfig, reducers);

const logger = createLogger({
    collapsed: true,
});

const Store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
            .concat(api.middleware)
            .concat(logger),
});

export const persistor = persistStore(Store);

setupListeners(Store.dispatch);

export default Store;
