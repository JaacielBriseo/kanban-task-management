import { createSlice } from '@reduxjs/toolkit';
export const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		isSelectBoardModalOpen: false,
		isSidebarOpen: false,
	},
	reducers: {
		toggleBoardModal: (state /* action */) => {
			state.isSelectBoardModalOpen = !state.isSelectBoardModalOpen;
		},
		toggleSidebar: (state /* action */) => {
			state.isSidebarOpen = !state.isSidebarOpen;
		},
	},
});

// Action creators are generated for each case reducer function
export const { toggleBoardModal,toggleSidebar } = uiSlice.actions;
