import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';
import { DataStatusDef, DataFetch, Status } from '../types';

const quizState: DataStatusDef = {
  items: [],
  status: Status.LOADING,
};

export const fetchData = createAsyncThunk<DataFetch[]>('data/fetchData', async () => {
  const response = await axios.get('https://opentdb.com/api.php?amount=10');
  return response.data.results;
});

const dataSlice = createSlice({
  name: 'data',
  initialState: quizState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.items = [];
        state.status = Status.LOADING;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.RESOLVE;
      })
      .addCase(fetchData.rejected, (state) => {
        state.items = [];
        state.status = Status.REJECT;
      });
  },
});

export const { setItems } = dataSlice.actions;
export const selectItems = (state: RootState) => state.dataSlice.items;
export default dataSlice.reducer;
