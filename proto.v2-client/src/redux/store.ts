import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slice/authSlice";
import modalReducer from "@/redux/slice/modalSlice";
import layoutReducer from "@/redux/slice/layoutSlice";
import { persistReducer, persistStore } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";

const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  layout: layoutReducer,
});

const persistConfig = {
  key: "root",
  storage: sessionStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default store;
