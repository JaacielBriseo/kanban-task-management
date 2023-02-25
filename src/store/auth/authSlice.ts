import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthSliceValues, User } from '../../interfaces';

const initialState: AuthSliceValues = {
	status: 'not-authenticated',
	user: {
		name: null,
		email: null,
		img: null,
		role: null,
		isActive: null,
		google: null,
		uid: null,
	},
	errorMessage: null,
};
export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<User>) => {
			state.status = 'authenticated';
			state.user.uid = action.payload.uid;
			state.user.email = action.payload.email;
			state.user.name = action.payload.name;
			state.user.img = action.payload.img;
			state.user.google = action.payload.google;
			state.user.role = action.payload.role;
			state.user.isActive = action.payload.isActive;
			state.errorMessage = null;
		},
		logout: (state, { payload }: { payload: { errorMessage: string | undefined | null } }) => {
			state.status = 'not-authenticated';
			state.user.uid = null;
			state.user.email = null;
			state.user.name = null;
			state.user.img = null;
			state.user.google = null;
			state.user.role = null;
			state.user.isActive = null;
			state.errorMessage = payload.errorMessage;
		},
		checkingCredentials: state => {
			state.status = 'checking';
		},
	},
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;
