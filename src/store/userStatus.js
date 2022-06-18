import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLoggedIn: false, username: "" };

export const userStatus = createSlice({
  name: "userStatus",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export default userStatus.reducer;
export const { setIsLoggedIn, setUsername } = userStatus.actions;
