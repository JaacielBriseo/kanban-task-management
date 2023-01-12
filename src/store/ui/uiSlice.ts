import { createSlice } from '@reduxjs/toolkit';
import { Task } from '../../interfaces/interfaces';
export const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		isSelectModalOpen: false,
		activeBoard: 'Platform Launch',
		isViewTaskModalOpen: false,
		viewTaskModalInfo: {} as Task,
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
	},
});

// Action creators are generated for each case reducer function
export const { toggleBoardModal, setActiveBoard, openViewTaskModal, closeViewTaskModal, toggleCheckedSubtask } =
	uiSlice.actions;
