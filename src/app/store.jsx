import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../reducers/search";
import playerReducer from "../reducers/player";

const store = configureStore({
  reducer: {
    search: searchReducer,
    player: playerReducer,
  },
});

export default store;
