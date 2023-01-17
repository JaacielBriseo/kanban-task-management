import { createSlice } from '@reduxjs/toolkit';
export const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		isSelectModalOpen: false,
		isTaskViewModalOpen: false,
		isAddNewTaskModalOpen: false,
		isEditTaskModalOpen: false,
	},
	reducers: {
		toggleSelectModal: state => {
			state.isSelectModalOpen = !state.isSelectModalOpen;
		},
		toggleTaskViewModal: state => {
			state.isTaskViewModalOpen = !state.isTaskViewModalOpen;
		},
		toggleAddNewTaskModal: state => {
			state.isAddNewTaskModalOpen = !state.isAddNewTaskModalOpen;
		},
		toggleEditTaskModal: state => {
			state.isEditTaskModalOpen = !state.isEditTaskModalOpen;
			state.isTaskViewModalOpen = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const { toggleSelectModal, toggleTaskViewModal, toggleAddNewTaskModal, toggleEditTaskModal } = uiSlice.actions;
