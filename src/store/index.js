import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/LoadingSlices";
import MessageSlices from "./slices/MessageSlices";
import FilterFormSlices from "./slices/FilterFormSlices";
import SelectedQuantitySlices from "./slices/SelectedQuantitySlices";


const store = configureStore({
  reducer: {
    loading: counterSlice,
    message: MessageSlices,
    filterForm: FilterFormSlices,
    SelectedQuantity: SelectedQuantitySlices,
  },
});

export default store;
