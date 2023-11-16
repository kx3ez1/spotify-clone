import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAlbums = createAsyncThunk(
  "album/fetchAlbums",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/albums");
    const data = await response.json();
    return data;
  }
);

const albumSlice = createSlice({
  name: "album",
  initialState: {
  },
  reducers: {},
  extraReducers: {},
});

export default albumSlice.reducer;
