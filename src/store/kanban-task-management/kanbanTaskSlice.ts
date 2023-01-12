import { createSlice } from '@reduxjs/toolkit';
import { Boards } from '../../interfaces';
import { findTask, findColumn, findNewColumn } from '../../helpers';
import data from '../../data/data.json';

const initialState = {
	...(data as Boards),
};
type UpdateTaskStatusPayload = {
	taskId: number;
	status: string;
	activeBoard: string;
};

export const kanbanTaskSlice = createSlice({
	name: 'kanbanTask',
	initialState,
	reducers: {
		toggleSubtaskCompleted: (state, { payload }) => {
			const { subtask, activeBoard } = payload;
			const newSubtask = {
				...subtask,
				isCompleted: !subtask.isCompleted,
			};

			const task = state.boards
				.find(board => board.name === activeBoard)!
				.columns.map(col => col.tasks)
				.flat()
				.find(task => task.subtasks.find(subtask => subtask.title === subtask.title));
			if (task) {
				task.subtasks = [...task.subtasks].map(subtask => {
					if (subtask.title === newSubtask.title) {
						return newSubtask;
					}
					return subtask;
				});
			}
		},
		updateTaskStatus: (state, { payload }: { payload: UpdateTaskStatusPayload }) => {
			const { taskId, status, activeBoard } = payload;
			const board = state.boards.find(board => board.name === activeBoard);
			if (!board) {
				console.error('Board not found');
				return;
			}
			const task = findTask(board, taskId);

			if (!task) {
				console.error('Task not found');
				return;
			}
			task.status = status;

			const taskColumn = findColumn(board, taskId);
			if (!taskColumn) {
				console.error('Task not found');
				return;
			}
			taskColumn.tasks = taskColumn.tasks.filter(t => t.id !== taskId);

			const newColumn = findNewColumn(board, status);
			if (!newColumn) {
				console.error(`Column not found for status: ${status}`);
				return;
			}

			newColumn.tasks.push(task);
		},
	},
});

// Action creators are generated for each case reducer function
export const { toggleSubtaskCompleted, updateTaskStatus } = kanbanTaskSlice.actions;
