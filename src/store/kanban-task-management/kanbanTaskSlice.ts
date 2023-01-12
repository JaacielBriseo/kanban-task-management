import { createSlice } from '@reduxjs/toolkit';
import data from '../../data/data.json';
import { BoardsData } from '../../interfaces';

const initialValues = {
	...(data as BoardsData),
};
export const kanbanTaskSlice = createSlice({
	name: 'kanbanTask',
	initialState: initialValues,
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
				.find(task => task.subtasks.find(subtask => subtask.title === payload.subtask.title));
			if (task) {
				task.subtasks = [...task.subtasks].map(subtask => {
					if (subtask.title === newSubtask.title) {
						return newSubtask;
					}
					return subtask;
				});
			}
		},
	},
});

// Action creators are generated for each case reducer function
export const { toggleSubtaskCompleted } = kanbanTaskSlice.actions;
