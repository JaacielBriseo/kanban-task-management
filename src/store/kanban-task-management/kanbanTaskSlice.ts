import { createSlice } from '@reduxjs/toolkit';
import data from '../../data/data.json';
import { toggleCompleted } from '../../helpers';
import { KanbanSliceInitialValues, Task } from '../../interfaces';
//* use current from @reduxjs/toolkit if need to use console.log
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
		setSelectedBoardId: (state, { payload }: { payload: number }) => {
			state.selectedBoardId = payload;
		},
		setSelectedTask: (state, { payload }: { payload: { columnId: number; taskId: number; task: Task } }) => {
			state.selectedTaskId = payload.taskId;
			state.selectedColumnId = payload.columnId;
		},
		toggleIsSubtaskCompleted: (
			state,
			{ payload }: { payload: { subtaskIndex: number; boardId: number; columnId: number; taskId: number } }
		) => {
			const { subtaskIndex, boardId, columnId, taskId } = payload;
			const subtask = state.boards[boardId].columns[columnId].tasks[taskId].subtasks[subtaskIndex];
			toggleCompleted(subtask);
		},
		changeTaskColumnAndStatus: (
			state,
			{ payload }: { payload: { newStatus: string; taskId: number; columnId: number; boardId: number } }
		) => {
			const { boardId, columnId, newStatus, taskId } = payload;

			// Find the task based on the taskId
			const task = state.boards[boardId].columns[columnId].tasks.find(task => task.taskId === taskId);

			// If the task is not found, return early
			if (!task) {
				return;
			}

			// Update the status of the task
			task.status = newStatus;

			// Remove the task from the current column
			const currentColumn = state.boards[boardId].columns[columnId];
			currentColumn.tasks = currentColumn.tasks.filter(t => t.taskId !== taskId);

			// Find the new column based on the new status
			const newColumn = state.boards[boardId].columns.find(col => col.name === newStatus);

			// If the new column is not found, return early
			if (!newColumn) {
				return;
			}

			// Add the task to the new column
			newColumn.tasks.push(task);

			// Update the selected column id if it's the same as the current column
			if (state.selectedColumnId === columnId) {
				state.selectedColumnId = newColumn.columnId;
			}
		},

		addNewTask: (state, { payload }: { payload: { newTask: Task; boardId: number; columnId: number } }) => {
			const { boardId, columnId, newTask } = payload;
			state.boards[boardId].columns[columnId].tasks.push(newTask);
		},
		deleteTask: (state, { payload }: { payload: { taskId: number; boardId: number } }) => {
			const { taskId, boardId } = payload;
			state.boards[boardId].columns = state.boards[boardId].columns.map(column => {
				column.tasks = column.tasks.filter(task => task.taskId !== taskId);
				return column;
			});
			state.selectedTaskId = null;
			state.selectedColumnId = null;
		}
		
	},
});

// Action creators are generated for each case reducer function
export const {
	addNewTask,
	setSelectedBoardId,
	setSelectedTask,
	toggleIsSubtaskCompleted,
	changeTaskColumnAndStatus,
	deleteTask,
} = kanbanTaskSlice.actions;
