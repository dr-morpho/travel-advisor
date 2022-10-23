import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';
import { DataStatus, DataFetch, Status } from '../../types';
import { URL } from '../../api/apiRestaurants'

interface FetchProp {
  ne: {
    lat: number;
    lng: number;
  };
  sw: {
    lat: number;
    lng: number;
  };
}


const dataState: DataStatus = {
  items: [],
  status: Status.LOADING,
};


export const fetchData = createAsyncThunk<any, FetchProp>('data/fetchData', async ({ sw, ne }) => {
  const { data: { data } } = await axios.get(URL, {
    params: {
      bl_latitude: sw.lat,
      tr_latitude: ne.lat,
      bl_longitude: sw.lng,
      tr_longitude: ne.lng,
    },
    headers: {
      'X-RapidAPI-Key': 'c147c7abb2msh316b607afca252dp1de555jsn6baa6fa29966',
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    }
  });
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
