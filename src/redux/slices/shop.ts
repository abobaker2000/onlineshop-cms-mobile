/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export interface IShopState {
	shop: {
		shop: IShop | null;
	} | null;
}

const initialState: IShopState = {
	shop: null,
};

const shopSlice = createSlice({
	name: 'shop',
	initialState,
	reducers: {
		setShop: (state, action) => {
			state.shop = action.payload;
		},
	},
});

export const { setShop } = shopSlice.actions;
export default shopSlice.reducer;
