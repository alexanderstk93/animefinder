import { createSlice } from "@reduxjs/toolkit/";

export const usersSlice = createSlice({
  name: "users",
  initialState: { users: [] },
  reducers: {
    setUsers: (state, action) => {
      console.log(action.payload);
      state.users = action.payload;
    },
  },
});

export default usersSlice.reducer;
export const { setUsers } = usersSlice.actions;
