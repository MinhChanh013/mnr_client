import { createSlice } from "@reduxjs/toolkit";

const initialState = { type: "success", content: "", duration: 3 };

const messsageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    showMessage: (_state, action) => {
      return {
        type: action.payload.type || "success",
        content: action.payload.content,
        duration: action.payload.duration || 3,
      };
    },
  },
});

export const { showMessage } = messsageSlice.actions;
export default messsageSlice.reducer;
