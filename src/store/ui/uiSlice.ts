import { createSlice } from '@reduxjs/toolkit';
export const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		isSelectModalOpen: false,
		isTaskViewModalOpen: false,
	},
	reducers: {
		toggleSelectModal: state => {
			state.isSelectModalOpen = !state.isSelectModalOpen;
		},
		toggleTaskViewModal: state => {
			state.isTaskViewModalOpen = !state.isTaskViewModalOpen;
		},
	},
});

// Action creators are generated for each case reducer function
export const { toggleSelectModal, toggleTaskViewModal } = uiSlice.actions;
