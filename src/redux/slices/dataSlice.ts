import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Status } from '../../types';
import { dataState } from '../initialState';
import { fetchData } from '../../api/fetchData';

const dataSlice = createSlice({
  name: 'data',
  initialState: dataState,
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
