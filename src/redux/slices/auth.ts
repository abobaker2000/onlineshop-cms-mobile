/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface IUser {
	id: 0;
	firstName: '';
	lastName: '';
	email: '';
	isVerified: false;
}

export interface IAuthState {
	user: IUser | null;
	isLoggedIn: boolean;
	authLoading: boolean;
	authError: string | null;
}

const initialState: IAuthState = {
	user: null,
	isLoggedIn: false,
	authLoading: true,
	authError: null,
};

const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		setLogin: (state, action) => {
			state.isLoggedIn = true;
			state.authLoading = false;
			state.user = action.payload;
		},
		setLogout: (state) => {
			state.isLoggedIn = false;
			state.authLoading = false;
			state.user = null;
		},
	},
});

export const { setLogin, setLogout } = loginSlice.actions;
export default loginSlice.reducer;
