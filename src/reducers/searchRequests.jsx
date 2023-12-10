import { createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_ADDRESS } from "../app/constants";

const fetchSearchSongs = createAsyncThunk(
  "search/fetchSearchSongs",
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

const fetchSearchArtists = createAsyncThunk(
  "search/fetchSearchArtists",
  async (query = "") => {
    query = query.trim();
    if (query === "" || query.length < 4) {
      return {
        results: [],
      };
    }
    const response = await fetch(SERVER_ADDRESS + "/search/artist?q=" + query);
    return await response.json();
  }
);

const fetchSearchAlbums = createAsyncThunk(
  "search/fetchSearchAlbums",
  async (query = "") => {
    query = query.trim();
    if (query === "" || query.length < 4) {
      return {
        results: [],
      };
    }
    const response = await fetch(SERVER_ADDRESS + "/search/album?q=" + query);
    return await response.json();
  }
);

const fetchSearchPlaylists = createAsyncThunk(
  "search/fetchSearchPlaylists",
  async (query = "") => {
    query = query.trim();
    if (query === "" || query.length < 4) {
      return {
        results: [],
      };
    }
    const response = await fetch(
      SERVER_ADDRESS + "/search/playlist?q=" + query
    );
    return await response.json();
  }
);

export {
  fetchSearchSongs,
  fetchSearchArtists,
  fetchSearchAlbums,
  fetchSearchPlaylists,
};
