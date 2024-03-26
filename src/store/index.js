import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/LoadingSlices";
import MessageSlices from "./slices/MessageSlices";
import FilterFormSlices from "./slices/FilterFormSlices";

const store = configureStore({
  reducer: {
    loading: counterSlice,
    message: MessageSlices,
    filterForm: FilterFormSlices,
  },
});

export default store;
