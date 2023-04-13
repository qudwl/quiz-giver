import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "data",
  initialState: {
    currentScore: 0,
    totalQuestions: 0,
    quizzes: [],
  },
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    changeQuizState: (state, action) => {
      state.quizzes[action.payload.id].played = action.payload.played;
      state.quizzes[action.payload.id].score = action.payload.score;
    },
    increaseScore: (state, action) => {
      state.currentScore++;
    },
    resetScore: (state) => {
      state.currentScore = 0;
    },
    setTotalQuestions: (state, action) => {
      state.totalQuestions = action.payload;
    },
  },
});

export const {
  toggleDarkMode,
  increaseScore,
  setTotalQuestions,
  setQuizzes,
  changeQuizState,
  resetScore,
} = slice.actions;

export default slice.reducer;
