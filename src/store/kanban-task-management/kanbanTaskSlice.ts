import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Board, KanbanSliceInitialValues, ToggleIsSubtaskCompletedPayLoad } from '../../interfaces';
import data from '../../data/data.json';
import { findBoardById, findColumnById, findTaskById } from '../../helpers';
const initialState: KanbanSliceInitialValues = {
	...data,
	selectedBoardId: null,
	selectedColumnId: null,
	selectedSubtaskId: null,
	selectedTaskId: null,
};
export const kanbanTaskSlice = createSlice({
	name: 'kanbanTask',
	initialState,
	reducers: {
		setSelectedBoardId: (state, { payload }: { payload: string }) => {
			state.selectedBoardId = payload;
		},
		setSelectedTaskId: (state, action: PayloadAction<string>) => {
			state.selectedTaskId = action.payload;
		},
		setSelectedColumnId: (state, action: PayloadAction<string>) => {
			state.selectedColumnId = action.payload;
		},
		createNewBoard: (state, action: PayloadAction<Board>) => {
			state.boards.push(action.payload);
		},
		toggleSubtaskCompleted: (state, action: PayloadAction<ToggleIsSubtaskCompletedPayLoad>) => {
			const { subtaskId } = action.payload;
			const { selectedBoardId, selectedColumnId, selectedTaskId } = state;
			const board = findBoardById(state.boards, selectedBoardId);
			const column = findColumnById(board?.columns, selectedColumnId);
			const task = findTaskById(column, selectedTaskId);
			const subtask = task?.subtasks.find(subtask => subtask.subtaskId === subtaskId);
			if (subtask) {
				subtask.isCompleted = !subtask.isCompleted;
			} else {
				console.error('No subtask to toggle');
			}
		},
	},
});

// Action creators are generated for each case reducer function
export const { createNewBoard, setSelectedBoardId, setSelectedTaskId, setSelectedColumnId, toggleSubtaskCompleted } =
	kanbanTaskSlice.actions;
