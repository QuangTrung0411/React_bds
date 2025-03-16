import { configureStore } from "@reduxjs/toolkit";
import toastReducer from './slice/toastSlice';


const store = configureStore({
  reducer: {
    toast:toastReducer
  },
});

// 👉 Export store để sử dụng trong Provider
export default store;

// 👉 Export RootState và AppDispatch để dùng trong TypeScript (nếu cần)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
