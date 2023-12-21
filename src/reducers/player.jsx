import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SERVER_ADDRESS } from "../app/constants.jsx";


const fetchFinalPlayUrl = createAsyncThunk(
    "player/fetchFinalSongUrl",
    async (songId) => {
        // console.log("fetchFinalPlayUrl: " + songId);
        // double encoding is must
        songId = encodeURIComponent(songId)
        songId = encodeURIComponent(songId)
        const response = await fetch(SERVER_ADDRESS + "/search/d?id=" + songId)
        return await response.json();
    }
);

const playerSlice = createSlice({
    name: "player",
    initialState: {
        currentSong: {},
        isPlaying: false,
        isLoaded: false,
        isUrlError: false,
        isMuted: false,
        isRepeat: false,
        isShuffle: false,
        readyState: 0, // 0 = HAVE_NOTHING, 1 = HAVE_METADATA, 2 = HAVE_CURRENT_DATA, 3 = HAVE_FUTURE_DATA, 4 = HAVE_ENOUGH_DATA
        currentTime: 0,
        duration: 0,
        queue: [],
    },
    reducers: {
        setCurrentSong: (state, action) => {
            state.currentSong = action.payload;
        },
        setIsPlaying: (state, action) => {
            state.isPlaying = action.payload;
        },
        setQueue: (state, action) => {
            state.queue = action.payload;
        },
        setIsLoaded: (state, action) => {
            state.isLoaded = action.payload;
        },
        setIsMuted: (state, action) => {
            state.isMuted = action.payload;
        },
        setIsRepeat: (state, action) => {
            state.isRepeat = action.payload;
        },
        setIsShuffle: (state, action) => {
            state.isShuffle = action.payload;
        },
        setCurrentTime: (state, action) => {
            state.currentTime = action.payload;
        },
        setDuration: (state, action) => {
            state.duration = action.payload;
        },
        setReadyState: (state, action) => {
            state.readyState = action.payload;
        },
    },
    extraReducers: {
        [fetchFinalPlayUrl.fulfilled]: (state, action) => {
            state.currentSong.playUrl = action.payload?.url;
        },
        [fetchFinalPlayUrl.rejected]: (state) => {
            state.isUrlError = true;
        },
        [fetchFinalPlayUrl.pending]: (state) => {
            state.isLoaded = false;
        }
    }
});

export const {
    setCurrentSong,
    setIsPlaying,
    setQueue,
    setIsLoaded,
    setIsMuted,
    setIsRepeat,
    setIsShuffle,
    setCurrentTime,
    setDuration,
    setReadyState,
} = playerSlice.actions;

export { fetchFinalPlayUrl };

export default playerSlice.reducer;