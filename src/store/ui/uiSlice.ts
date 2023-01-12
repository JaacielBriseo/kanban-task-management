import { createSlice } from '@reduxjs/toolkit';
import { Task } from '../../interfaces';
export const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		isSelectModalOpen: false,
		activeBoard: 'Platform Launch',
		isViewTaskModalOpen: false,
		viewTaskModalInfo: {} as Task,
		isNewTaskModalOpen: false,
	},
	reducers: {
		toggleBoardModal: state => {
			state.isSelectModalOpen = !state.isSelectModalOpen;
		},
		setActiveBoard: (state, { payload }) => {
			state.activeBoard = payload;
		},
		openViewTaskModal: (state, { payload }: { payload: Task }) => {
			state.isViewTaskModalOpen = true;
			state.viewTaskModalInfo = payload;
		},
		closeViewTaskModal: state => {
			state.isViewTaskModalOpen = false;
		},
		toggleCheckedSubtask: (state, { payload }) => {
			const subtaskIndex = state.viewTaskModalInfo.subtasks.findIndex(subtask => subtask.title === payload);
			state.viewTaskModalInfo.subtasks[subtaskIndex].isCompleted =
				!state.viewTaskModalInfo.subtasks[subtaskIndex].isCompleted;
		},
		setCurrentStatus: (state, { payload }) => {
			state.viewTaskModalInfo.status = payload;
		},
		toggleNewTaskModal: state => {
			state.isNewTaskModalOpen = !state.isNewTaskModalOpen;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	closeViewTaskModal,
	openViewTaskModal,
	setActiveBoard,
	setCurrentStatus,
	toggleBoardModal,
	toggleCheckedSubtask,
	toggleNewTaskModal,
} = uiSlice.actions;
