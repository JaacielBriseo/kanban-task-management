import data from '../../data/data.json';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { findBoardById, findColumnById, findTaskById } from '../../helpers';
import { Board, KanbanSliceInitialValues, ToggleIsSubtaskCompletedPayLoad } from '../../interfaces';
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
		setSelectedBoardId: (state, { payload }: { payload: string | null }) => {
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
		changeTaskColumnAndStatus: (state, action: PayloadAction<{ newStatus: string }>) => {
			const { newStatus } = action.payload;
			const { selectedBoardId, selectedColumnId, selectedTaskId } = state;
			const board = findBoardById(state.boards, selectedBoardId);
			const column = findColumnById(board?.columns, selectedColumnId);
			if (!board || !column) {
				console.error(`No board:${board} or col:${column}`);
				return;
			}
			const task = findTaskById(column, selectedTaskId);
			if (task) {
				task.status = newStatus;
				column.tasks = column.tasks.filter(t => t.taskId !== task.taskId);
				const newColumn = board.columns.find(column => column.name === newStatus);
				if (newColumn) {
					newColumn.tasks.push(task);
					state.selectedColumnId = newColumn.columnId;
					state.selectedTaskId = task.taskId;
				}
			} else {
				console.error(`No task with : ${task}`);
			}
		},
		deleteTask: (state, action: PayloadAction<{ taskIdToDelete: string }>) => {
			const { selectedBoardId, selectedColumnId } = state;
			const board = findBoardById(state.boards, selectedBoardId);
			const column = findColumnById(board?.columns, selectedColumnId);
			if (!column) {
				console.error('No column finded');
				return;
			}
			column.tasks = column.tasks.filter(t => t.taskId !== action.payload.taskIdToDelete);
		},
		removeBoard: (state, action: PayloadAction<{ boardIdToDelete: string }>) => {
			state.boards = state.boards.filter(board => board.boardId !== action.payload.boardIdToDelete);
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	changeTaskColumnAndStatus,
	deleteTask,
	removeBoard,
	createNewBoard,
	setSelectedBoardId,
	setSelectedTaskId,
	setSelectedColumnId,
	toggleSubtaskCompleted,
} = kanbanTaskSlice.actions;
