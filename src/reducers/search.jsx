import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {SERVER_ADDRESS} from "../app/constants";

const fetchSearch = createAsyncThunk(
    "search/fetchSearch",
    async (query="") => {
        query = query.trim();
        if (query === "" || query.length < 4) {
            return {
                "results": []
            }
        }
        const response = await fetch(SERVER_ADDRESS + "/search/song?q=" + query)
        return await response.json();
    }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",  // search input query
    searchResults: {
      "results": []
    }, // search results
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: {
    [fetchSearch.fulfilled]: (state, action) => {
      state.searchResults = action.payload;
    },
}
});

export const { setQuery } = searchSlice.actions;
export { fetchSearch };

export default searchSlice.reducer;