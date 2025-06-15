import { createSlice } from "@reduxjs/toolkit";

const gptSearchSlice = createSlice({
  name: "gpt",
  initialState: {
    showgptsearch: false,
    gptMovies: null,
    movieNames: null,
    movieResult: null,
    firstMovie: null,
    similarMovies: [],
    loading: false,
    selectedMovie: null, // 👈 NEW
  },
  reducers: {
    showGPTSearchView: (state) => {
      state.showgptsearch = !state.showgptsearch;
    },
    addgptMovieResult: (state, action) => {
      const { firstMovie, similarMovies } = action.payload;
      state.firstMovie = firstMovie;
      state.similarMovies = similarMovies;
      state.selectedMovie = firstMovie; // 👈 initialize with first
    },
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
  },
});

export const { showGPTSearchView, addgptMovieResult, setSelectedMovie } = gptSearchSlice.actions;

export default gptSearchSlice.reducer;
