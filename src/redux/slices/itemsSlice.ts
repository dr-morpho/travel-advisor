import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { clickedState } from '../initialState';

const itemsSlice = createSlice({
  name: 'clicked',
  initialState: clickedState,
  reducers: {
    setChildClicked: (state, action: PayloadAction<string>) => {
      state.childClicked = action.payload;
    },
  },
});

export const { setChildClicked } = itemsSlice.actions;
export const selectClicked = (state: RootState) => state.itemsSlice.childClicked;
export default itemsSlice.reducer;
