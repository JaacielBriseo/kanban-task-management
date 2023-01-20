import { createSlice } from '@reduxjs/toolkit';
export const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		isSelectModalOpen: false,
		isTaskViewModalOpen: false,
		isAddNewTaskModalOpen: false,
		isEditTaskModalOpen: false,
		isAddNewBoardModalOpen: false,
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
		toggleAddNewBoardModal: state => {
			state.isAddNewBoardModalOpen = !state.isAddNewBoardModalOpen;
			state.isSelectModalOpen = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	toggleAddNewBoardModal,
	toggleAddNewTaskModal,
	toggleEditTaskModal,
	toggleSelectModal,
	toggleTaskViewModal,
} = uiSlice.actions;
