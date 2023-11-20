import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slice/authSlice";
import modalReducer from "@/redux/slice/modalSlice";
import footerReucer from "@/redux/slice/footerSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  footer: footerReucer,
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
