import { createSlice } from "@reduxjs/toolkit";

const initialState = { SelectedQuantity: 0 };

const SelectedQuantitySlice = createSlice({
  name: "SelectedQuantity",
  initialState,
  reducers: {
    setSelectedQuantity: (state, action) => {
      state.SelectedQuantity = action.payload;
    },
  },
});

export const { setSelectedQuantity } = SelectedQuantitySlice.actions;
export default SelectedQuantitySlice.reducer;
