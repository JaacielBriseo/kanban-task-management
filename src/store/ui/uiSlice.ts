import { createSlice } from '@reduxjs/toolkit';
export const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		isSelectModalOpen: false,
		isTaskViewModalOpen: false,
		isAddNewTaskModalOpen: false,
	},
	reducers: {
		toggleSelectModal: state => {
			state.isSelectModalOpen = !state.isSelectModalOpen;
		},
		toggleTaskViewModal: state => {
			state.isTaskViewModalOpen = !state.isTaskViewModalOpen;
		},
		toggleAddNewTaskModal: state => void !state.isAddNewTaskModalOpen,
	},
});

// Action creators are generated for each case reducer function
export const { toggleSelectModal, toggleTaskViewModal, toggleAddNewTaskModal } = uiSlice.actions;
