import { createSlice } from '@reduxjs/toolkit';
import { AuthSliceValues, LoginPayload } from '../../interfaces';

const initialState: AuthSliceValues = {
	status: 'authenticated',
	uid: null,
	email: null,
	displayName: null,
	photoURL: null,
	errorMessage: null,
};
export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, { payload }: LoginPayload) => {
			state.status = 'authenticated';
			state.uid = payload.uid;
			state.email = payload.email;
			state.displayName = payload.displayName;
			state.photoURL = payload.photoURL;
			state.errorMessage = null;
		},
		logout: (state, { payload }:{payload:{errorMessage:string | undefined | null}}) => {
			state.status = 'not-authenticated';
			state.uid = null;
			state.email = null;
			state.displayName = null;
			state.photoURL = null;
			state.errorMessage = payload.errorMessage;
		},
		checkingCredentials: state => {
			state.status = 'checking';
		},
	},
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;
