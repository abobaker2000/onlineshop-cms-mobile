import { Action, Store, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector as useSelectorGeneric } from 'react-redux';
import loginReducer, { IAuthState } from './slices/auth';
import shopReducer from './slices/shop';

const store = configureStore({
	reducer: {
		login: loginReducer,
		shop:  shopReducer
	},
});

// export type RootState = ReturnType<typeof store>;

export type GeneralState = {
	login: IAuthState;
	shop: {shop: IShop};
	[extraProps: string]: unknown;
};

// eslint-disable-next-line no-use-before-define
export type AppStore = Store<GeneralState, Action<string>> & { dispatch: AppDispatch };

export type AppDispatch = typeof store.dispatch;

export default store;

export const useSelector: TypedUseSelectorHook<GeneralState> = useSelectorGeneric;
