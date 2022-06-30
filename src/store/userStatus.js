import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  username: "",
  windowHeight: window.scrollY,
};

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

    setWindowHeight: (state, action) => {
      state.windowHeight = action.payload;
    },
  },
});

export default userStatus.reducer;
export const { setIsLoggedIn, setUsername, setWindowHeight } =
  userStatus.actions;
