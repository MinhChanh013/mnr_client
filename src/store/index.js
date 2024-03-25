import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/LoadingSlices";
import MessageSlices from "./slices/MessageSlices";

const store = configureStore({
  reducer: {
    loading: counterSlice,
    message: MessageSlices,
  },
});

export default store;
