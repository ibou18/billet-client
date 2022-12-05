import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authStore from "./store/authStore";
import { api } from "./authApi";

const reducers = combineReducers({
  auth: authStore,
  [api.reducerPath]: api.reducer,
});
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: getDefaultMiddleware().concat(api.middleware),
      serializableCheck: false,
    }),
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(api.middleware),
});
