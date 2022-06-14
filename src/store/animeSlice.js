import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  animesFound: [],
  fetchingStatus: false,
  searchContent: "",
  selectContent: "Action",
  searchStatus: false,
};

export const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {
    setAnimesFound: (state, action) => {
      state.animesFound = action.payload;
    },
    setSearch: (state, action) => {
      state.searchContent = action.payload;
    },
    setSelect: (state, action) => {
      state.selectContent = action.payload;
    },
    setSearchStatus: (state, action) => {
      state.searchStatus = action.payload;
    },
  },
});

export default animeSlice.reducer;
export const { setAnimesFound, setSearch, setSearchStatus, setSelect } =
  animeSlice.actions;
