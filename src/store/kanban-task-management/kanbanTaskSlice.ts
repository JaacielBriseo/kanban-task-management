import data from '../../data/data.json';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { findBoardById, findColumnById, findColumnByName, findTaskById } from '../../helpers';
import { Board, KanbanSliceInitialValues, ToggleIsSubtaskCompletedPayLoad } from '../../interfaces';
import { Task } from '../../interfaces/interfaces';
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
		createNewBoard: (state, action: PayloadAction<Board>) => {
			state.boards.push(action.payload);
		},
		createNewTask: (state, action: PayloadAction<Task>) => {
			const { selectedBoardId } = state;
			const board = findBoardById(state.boards, selectedBoardId);
			if (!board) {
				console.error('No board active');
				return;
			}
			const column = findColumnByName(board?.columns, action.payload.status);
			if (!column) {
				console.error('No column to add the task');
				return;
			}
			column.tasks.push(action.payload);
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
		updateTask: (state, action: PayloadAction<{ updatedTask: Task }>) => {
			const { selectedBoardId, selectedColumnId, selectedTaskId } = state;
			const { updatedTask } = action.payload;
			const board = findBoardById(state.boards, selectedBoardId);
			const column = findColumnById(board?.columns, selectedColumnId);
			if (!column) {
				console.error(`No column finded`);
				return;
			}
			if (!board) {
				console.error('No board');
				return;
			}
			const taskIndex = column.tasks.findIndex(task => task.taskId === selectedTaskId);
			if (taskIndex === -1) {
				console.error(`No task to update`);
				return;
			}
			if (column.name === updatedTask.status) {
				column.tasks[taskIndex] = updatedTask;
			} else {
				column.tasks = column.tasks.filter(t => t.taskId !== updatedTask.taskId);
				const newColumn = board.columns.find(column => column.name === updatedTask.status);
				if (newColumn) {
					newColumn.tasks.push(updatedTask);
					state.selectedColumnId = newColumn.columnId;
					state.selectedTaskId = updatedTask.taskId;
				}
			}
		},
		updateBoard: (state, action: PayloadAction<Board>) => {
			const { boards, selectedBoardId } = state;
			const idx = boards.findIndex(board => board.boardId === selectedBoardId);
			if (idx >= 0) {
				state.boards[idx] = action.payload;
			} else {
				console.error(`No board active`);
			}
		},
		setSelectedBoardId: (state, { payload }: { payload: string | null }) => {
			state.selectedBoardId = payload;
		},
		setSelectedTaskId: (state, action: PayloadAction<string>) => {
			state.selectedTaskId = action.payload;
		},
		setSelectedColumnId: (state, action: PayloadAction<string>) => {
			state.selectedColumnId = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	changeTaskColumnAndStatus,
	createNewBoard,
	createNewTask,
	deleteTask,
	removeBoard,
	setSelectedBoardId,
	setSelectedColumnId,
	setSelectedTaskId,
	toggleSubtaskCompleted,
	updateBoard,
	updateTask,
} = kanbanTaskSlice.actions;
