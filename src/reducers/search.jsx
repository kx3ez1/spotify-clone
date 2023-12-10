import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSearchSongs,
  fetchSearchAlbums,
  fetchSearchArtists,
  fetchSearchPlaylists,
} from "../reducers/searchRequests";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "", // search input query
    searchResults: {
      songs: {},
      artists: {},
      albums: {},
      playlists: {},
    }, // search results
    tagList: [
      { name: "songs", active: true, param: "tracks" },
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchSongs.pending, (state) => {
        state.searchResults.songs = {};
      })
      .addCase(fetchSearchSongs.fulfilled, (state, action) => {
        state.searchResults.songs = action.payload;
      })
      .addCase(fetchSearchSongs.rejected, (state) => {
        state.searchResults.songs = {};
      })
      .addCase(fetchSearchArtists.pending, (state) => {
        state.searchResults.artists = {};
      })
      .addCase(fetchSearchArtists.fulfilled, (state, action) => {
        state.searchResults.artists = action.payload;
      })
      .addCase(fetchSearchArtists.rejected, (state) => {
        state.searchResults.artists = {};
      })
      .addCase(fetchSearchAlbums.pending, (state) => {
        state.searchResults.albums = {};
      })
      .addCase(fetchSearchAlbums.fulfilled, (state, action) => {
        state.searchResults.albums = action.payload;
      })
      .addCase(fetchSearchAlbums.rejected, (state) => {
        state.searchResults.albums = {};
      })
      .addCase(fetchSearchPlaylists.pending, (state) => {
        state.searchResults.playlists = {};
      })
      .addCase(fetchSearchPlaylists.fulfilled, (state, action) => {
        state.searchResults.playlists = action.payload;
      })
      .addCase(fetchSearchPlaylists.rejected, (state) => {
        state.searchResults.playlists = {};
      });
  },
});

export const { setQuery, setSearchType } = searchSlice.actions;

export default searchSlice.reducer;
