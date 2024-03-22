import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/LoadingSlices";

const store = configureStore({
  reducer: {
    loading: counterSlice,
  },
});

export default store;
