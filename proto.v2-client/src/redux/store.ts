import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slice/authSlice";
import modalReducer from "@/redux/slice/modalSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
