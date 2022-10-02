import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AnswerType, QuizType } from '../types';

const answerState: AnswerType = {
  answer: [],
};

const itemsSlice = createSlice({
  name: 'answer',
  initialState: answerState,
  reducers: {
    setAnswer: (state, action: PayloadAction<QuizType[]>) => {
      state.answer = action.payload;
    },
  },
});

export const { setAnswer } = itemsSlice.actions;
export const selectAnswer = (state: RootState) => state.itemsSlice.answer;
export default itemsSlice.reducer;
