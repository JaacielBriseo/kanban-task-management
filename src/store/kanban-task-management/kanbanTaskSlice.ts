import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { findBoardById, findColumnById, findColumnByName, findTaskById } from '../../helpers';
import { Board, KanbanSliceInitialValues, ToggleIsSubtaskCompletedPayLoad, Task } from '../../interfaces';
import { fetchUserBoards } from '../thunks';
const initialState: KanbanSliceInitialValues = {
	boards: [],
	selectedBoardId: null,
	selectedColumnId: null,
	selectedSubtaskId: null,
	selectedTaskId: null,
	fetchingBoards: false,
};
export const kanbanTaskSlice = createSlice({
	name: 'kanbanTask',
	initialState,
	reducers: {
		changeTaskColumnAndStatus: (state, action: PayloadAction<{ newStatus: string }>) => {
			const { newStatus } = action.payload;
			const board = findBoardById(state.boards, state.selectedBoardId);
			const column = findColumnById(board?.columns, state.selectedColumnId);
			if (!board || !column) {
				console.error(`No board:${board} or col:${column}`);
				return;
			}
			const task = findTaskById(column, state.selectedTaskId);
			if (task) {
				task.status = newStatus;
				column.tasks = column.tasks.filter(t => t.taskId !== task.taskId);
				const newColumn = board.columns.find(column => column.columnName === newStatus);
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
			const board = findBoardById(state.boards, state.selectedBoardId);
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
			const board = findBoardById(state.boards, state.selectedBoardId);
			const column = findColumnById(board?.columns, state.selectedColumnId);
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

			const board = findBoardById(state.boards, state.selectedBoardId);
			const column = findColumnById(board?.columns, state.selectedColumnId);
			const task = findTaskById(column, state.selectedTaskId);
			const subtask = task?.subtasks.find(subtask => subtask.subtaskId === subtaskId);
			if (subtask) {
				subtask.isCompleted = !subtask.isCompleted;
			} else {
				console.error('No subtask to toggle');
			}
		},
		updateTask: (state, action: PayloadAction<Task>) => {
			const board = findBoardById(state.boards, state.selectedBoardId);
			const column = findColumnById(board?.columns, state.selectedColumnId);
			if (!column) {
				console.error(`No column finded`);
				return;
			}
			if (!board) {
				console.error('No board');
				return;
			}
			const taskIndex = column.tasks.findIndex(task => task.taskId === state.selectedTaskId);
			if (taskIndex === -1) {
				console.error(`No task to update`);
				return;
			}
			if (column.columnName === action.payload.status) {
				column.tasks[taskIndex] = action.payload;
			} else {
				column.tasks = column.tasks.filter(t => t.taskId !== action.payload.taskId);
				const newColumn = board.columns.find(column => column.columnName === action.payload.status);
				if (newColumn) {
					newColumn.tasks.push(action.payload);
					state.selectedColumnId = newColumn.columnId;
					state.selectedTaskId = action.payload.taskId;
				}
			}
		},
		updateBoard: (state, action: PayloadAction<Board>) => {
			const idx = state.boards.findIndex(board => board.boardId === state.selectedBoardId);
			if (idx >= 0) {
				state.boards[idx] = action.payload;
			} else {
				console.error(`No board active`);
			}
		},
		setSelectedBoardId: (state, action: PayloadAction<string | null>) => {
			state.selectedBoardId = action.payload;
		},
		setSelectedColumnId: (state, action: PayloadAction<string | null>) => {
			state.selectedColumnId = action.payload;
		},
		setSelectedTaskId: (state, action: PayloadAction<string | null>) => {
			state.selectedTaskId = action.payload;
		},
		setSelectedSubtaskId: (state, action: PayloadAction<string | null>) => {
			state.selectedSubtaskId = action.payload;
		},
	},

	extraReducers: builder => {
		builder.addCase(fetchUserBoards.pending, (state, action) => {
			state.fetchingBoards = true;
		});
		builder.addCase(fetchUserBoards.fulfilled, (state, action) => {
			state.boards = action.payload;
			state.fetchingBoards = false;
		});
		builder.addCase(fetchUserBoards.rejected, (state, action) => {
			state.fetchingBoards = false;
			state.boards = [];
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

	setSelectedBoardId,
	setSelectedColumnId,
	setSelectedTaskId,
	setSelectedSubtaskId,
} = kanbanTaskSlice.actions;
