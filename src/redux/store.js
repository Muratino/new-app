import { configureStore } from "@reduxjs/toolkit";
import user from "./Slice/user";

export const store = configureStore({
  reducer: {
    user,
  },
});
