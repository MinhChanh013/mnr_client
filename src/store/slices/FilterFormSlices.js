import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const filterFormSlices = createSlice({
  name: "filterForm",
  initialState,
  reducers: {
    updateForm: (_state, action) => {
      return {
        ...action.payload,
      };
    },
  },
});

export const { updateForm } = filterFormSlices.actions;
export default filterFormSlices.reducer;
