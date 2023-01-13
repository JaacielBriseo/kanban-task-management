import { createSlice } from '@reduxjs/toolkit';
import { Boards } from '../../interfaces';
import { findTask, findColumn, findNewColumn, findColumnByName } from '../../helpers';
import data from '../../data/data.json';

const initialState = {
	...(data as Boards),
};
type UpdateTaskStatusPayload = {
	taskId: number;
	status: string;
	activeBoard: string;
};
type AddNewTaskPayload = {
	activeBoard: string;
	status: string; //? This is going to be used to place the task in the correct column
	id: number;
	title: string;
	description: string;
	statusId: number;
	subtasks?: { title: string; isCompleted: boolean };
};

export const kanbanTaskSlice = createSlice({
	name: 'kanbanTask',
	initialState,
	reducers: {
		toggleSubtaskCompleted: (state, { payload }) => {
			const { subtask, activeBoard } = payload;
			const { title } = subtask;
			const newSubtask = {
				...subtask,
				isCompleted: !subtask.isCompleted,
			};

			const task = state.boards
				.find(board => board.name === activeBoard)!
				.columns.map(col => col.tasks)
				.flat()
				.find(task => task.subtasks.find(subtask => subtask.title === title));
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
				board.columns.push({
					id: board.columns.length,
					name: status,
					tasks: [{ ...task }],
				});
			} else {
				newColumn.tasks.push(task);
			}
		},
		addNewTask: (state, { payload }: { payload: AddNewTaskPayload }) => {
			const { activeBoard, description, id, status, statusId, title, subtasks } = payload;
			const board = state.boards.find(board => board.name === activeBoard);
			if (!board) {
				console.error(`Board: ${board} not found`);
				return;
			}
			const column = findColumnByName(board, status);
			if (!column) {
				console.error(`Column: ${column} not found`);
				return;
			}
			column.tasks.push({
				id,
				description,
				status,
				statusId,
				subtasks: subtasks ? [subtasks] : [],
				title,
			});
		},
	},
});

// Action creators are generated for each case reducer function
export const { toggleSubtaskCompleted, updateTaskStatus, addNewTask } = kanbanTaskSlice.actions;
