import { createSlice } from '@reduxjs/toolkit';
export const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		isSelectBoardModalOpen: false,
		isSidebarOpen: false,
		isAddNewBoardModalOpen: false,
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
	},
});

// Action creators are generated for each case reducer function
export const { toggleSelectBoardModal, toggleSidebar, toggleAddNewBoardModal } = uiSlice.actions;
