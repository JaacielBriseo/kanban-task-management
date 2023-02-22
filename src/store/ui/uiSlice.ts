import { createSlice } from '@reduxjs/toolkit';
export const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		isSelectBoardModalOpen: false,
		isSidebarOpen: false,
		isAddNewBoardModalOpen: false,
		isViewTaskModalOpen: false,
		isDeleteTaskModalOpen: false,
		isDeleteBoardModalOpen: false,
	},
	reducers: {
		toggleSelectBoardModal: state => {
			state.isSelectBoardModalOpen = !state.isSelectBoardModalOpen;
		},
		toggleSidebar: state => {
			state.isSidebarOpen = !state.isSidebarOpen;
		},
		toggleAddNewBoardModal: state => {
			state.isAddNewBoardModalOpen = !state.isAddNewBoardModalOpen;
		},
		toggleViewTaskModal: state => {
			state.isViewTaskModalOpen = !state.isViewTaskModalOpen;
		},
		toggleDeleteTaskModal: state => {
			state.isDeleteTaskModalOpen = !state.isDeleteTaskModalOpen;
		},
		toggleDeleteBoardModal: state => {
			state.isDeleteBoardModalOpen = !state.isDeleteBoardModalOpen;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	toggleSelectBoardModal,
	toggleSidebar,
	toggleAddNewBoardModal,
	toggleViewTaskModal,
	toggleDeleteTaskModal,
	toggleDeleteBoardModal,
} = uiSlice.actions;
