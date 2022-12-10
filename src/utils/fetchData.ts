import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { DataFetch, FetchProp } from '../types';
import { URL } from '../api/apiRestaurants'

export const fetchData = createAsyncThunk<DataFetch[], FetchProp>('data/fetchData', async ({ sw, ne }) => {
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