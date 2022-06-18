import { configureStore } from "@reduxjs/toolkit";
import animeReducer from "./animeSlice";
import usersReducer from "./usersSlice";
import usersStatusReducer from "./userStatus";
const store = configureStore({
  reducer: {
    anime: animeReducer,
    users: usersReducer,
    userStatus: usersStatusReducer,
  },
});

export default store;
