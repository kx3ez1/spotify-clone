import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SERVER_ADDRESS } from "../app/constants";

const fetchSearch = createAsyncThunk(
  "search/fetchSearch",
  async (query = "") => {
    query = query.trim();
    if (query === "" || query.length < 4) {
      return {
        results: [],
      };
    }
    const response = await fetch(SERVER_ADDRESS + "/search/song?q=" + query);
    return await response.json();
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "", // search input query
    searchResults: {
      results: [],
    }, // search results
    tagList: [
      { name: "songs", active: false, param: "tracks" },
      { name: "artists", active: false, param: "artists" },
      { name: "albums", active: false, param: "albums" },
      { name: "playlists", active: false, param: "playlists" },
    ],
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setSearchType: (state, action) => {
      state.tagList = state.tagList.map((tag) => {
        if (tag.param === action.payload) {
          return { ...tag, active: true };
        }
        return { ...tag, active: false };
      });
    },
  },
  extraReducers: {
    [fetchSearch.fulfilled]: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

export const { setQuery, setSearchType } = searchSlice.actions;
export { fetchSearch };

export default searchSlice.reducer;
