import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../store/AuthSlice";
import todoSlice from "../store/todoSlice";

const Store = configureStore({
  reducer: {
    todo: todoSlice,
    auth: AuthSlice,
    
  },
});
export default Store;
