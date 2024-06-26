import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from "../Redux/User/UserSLice";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage"
import persistStore from 'redux-persist/es/persistStore';

const rootReducers = combineReducers({user: userReducer});

const persistConfig = {
   key: 'root',
   storage,
   version: 1
}

const persistReducers = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
     serializableCheck: false,
  })
})

export const persistor = persistStore(store);