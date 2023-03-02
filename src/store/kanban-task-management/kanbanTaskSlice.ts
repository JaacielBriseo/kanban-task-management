import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { findBoardById, findColumnById, findColumnByName, findTaskById } from '../../helpers';
import { Board, KanbanSliceInitialValues, ToggleIsSubtaskCompletedPayLoad, Task } from '../../interfaces';
import { fetchUserBoards } from '../thunks';
import { store } from '../store';

const initialState: KanbanSliceInitialValues = {
	boards: [],
};
export const kanbanTaskSlice = createSlice({
	name: 'kanbanTask',
	initialState,
	reducers: {
		changeTaskColumnAndStatus: (state, action: PayloadAction<{ newStatus: string }>) => {
			const { newStatus } = action.payload;
			const { ui } = store.getState();
			const { selectedBoardId, selectedColumnId, selectedTaskId } = ui;
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
				const newColumn = board.columns.find(column => column.columnName === newStatus);
				if (newColumn) {
					newColumn.tasks.push(task);
					// selectedColumnId = newColumn.columnId;
					// selectedTaskId = task.taskId;
				}
			} else {
				console.error(`No task with : ${task}`);
			}
		},
		createNewBoard: (state, action: PayloadAction<Board>) => {
			state.boards.push(action.payload);
		},
		createNewTask: (state, action: PayloadAction<Task>) => {
			const { ui } = store.getState();
			const { selectedBoardId } = ui;
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
			const { ui } = store.getState();
			const { selectedBoardId, selectedColumnId } = ui;
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
			const { ui } = store.getState();
			const { selectedBoardId, selectedColumnId, selectedTaskId } = ui;
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
			const { updatedTask } = action.payload;
			const { ui } = store.getState();
			const { selectedBoardId, selectedColumnId, selectedTaskId } = ui;
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
			if (column.columnName === updatedTask.status) {
				column.tasks[taskIndex] = updatedTask;
			} else {
				column.tasks = column.tasks.filter(t => t.taskId !== updatedTask.taskId);
				const newColumn = board.columns.find(column => column.columnName === updatedTask.status);
				if (newColumn) {
					newColumn.tasks.push(updatedTask);
					// selectedColumnId = newColumn.columnId;
					// selectedTaskId = updatedTask.taskId;
				}
			}
		},
		updateBoard: (state, action: PayloadAction<Board>) => {
			const { ui } = store.getState();
			const { selectedBoardId } = ui;
			const idx = state.boards.findIndex(board => board.boardId === selectedBoardId);
			if (idx >= 0) {
				state.boards[idx] = action.payload;
			} else {
				console.error(`No board active`);
			}
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchUserBoards.fulfilled, (state, action) => {
			state.boards = action.payload;
		});
	},
});

// Action creators are generated for each case reducer function
export const {
	changeTaskColumnAndStatus,
	createNewBoard,
	createNewTask,
	deleteTask,
	removeBoard,
	toggleSubtaskCompleted,
	updateBoard,
	updateTask,
} = kanbanTaskSlice.actions;
