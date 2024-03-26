import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const filterFormSlices = createSlice({
  name: "message",
  initialState,
  reducers: {
    updateForm: (_state, action) => {
      return {
        type: action.payload.type || "success",
        content: action.payload.content,
        duration: action.payload.duration || 3,
      };
    },
  },
});

export const { updateForm } = filterFormSlices.actions;
export default filterFormSlices.reducer;
