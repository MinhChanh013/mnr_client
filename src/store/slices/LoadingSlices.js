import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false };

const counterSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = counterSlice.actions;
export default counterSlice.reducer;
