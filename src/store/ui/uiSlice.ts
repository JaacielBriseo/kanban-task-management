import { createSlice } from '@reduxjs/toolkit';
export const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		isSelectModalOpen: false,
		activeBoard: 'Platform Launch',
		isViewTaskModalOpen: false,
		viewTaskData: {
			description: '',
			status: '',
			subtasks: [{ title: '' }],
			title: '',
		},
	},
	reducers: {
		toggleBoardModal: (state) => {
			state.isSelectModalOpen = !state.isSelectModalOpen;
		},
		setActiveBoard: (state, { payload }) => {
			state.activeBoard = payload;
		},
		setActiveViewTask: (state, { payload }) => {
			state.isViewTaskModalOpen = true;
			state.viewTaskData = payload;
		},
		closeViewTaskModal: (state) => {
			state.isViewTaskModalOpen = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const { toggleBoardModal, setActiveBoard, setActiveViewTask, closeViewTaskModal } = uiSlice.actions;
