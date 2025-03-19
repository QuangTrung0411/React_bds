import { configureStore } from "@reduxjs/toolkit";
import toastReducer from './slice/toastSlice';
import authReducer from './slice/authSlice';


const store = configureStore({
  reducer: {
    toast:toastReducer,
    auth:authReducer
  },
});

// 👉 Export store để sử dụng trong Provider
export default store;

// 👉 Export RootState và AppDispatch để dùng trong TypeScript (nếu cần)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
