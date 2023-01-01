import { createSlice } from '@reduxjs/toolkit';
export const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		isSelectModalOpen: false,
		activeBoard: 'Platform Launch',
	},
	reducers: {
		toggleBoardModal: (state) => {
			state.isSelectModalOpen = !state.isSelectModalOpen;
		},
		setActiveBoard: (state, { payload }) => {
			state.activeBoard = payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { toggleBoardModal, setActiveBoard } = uiSlice.actions;
