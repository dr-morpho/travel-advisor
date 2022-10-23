import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';
import { DataStatus, DataFetch, Status } from '../../types';
import { URL, options } from '../../api/apiRestaurants'

const dataState: DataStatus = {
  items: [],
  status: Status.LOADING,
};

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const { data: { data } } = await axios.get(URL, options);
  return data;
});

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
