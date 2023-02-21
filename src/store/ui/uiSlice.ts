import { createSlice } from '@reduxjs/toolkit';
export const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		isSelectBoardModalOpen: false,
		isSidebarOpen: false,
		isAddNewBoardModalOpen: false,
		isViewTaskModalOpen: false,
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
	},
});

// Action creators are generated for each case reducer function
export const { toggleSelectBoardModal, toggleSidebar, toggleAddNewBoardModal, toggleViewTaskModal } = uiSlice.actions;
