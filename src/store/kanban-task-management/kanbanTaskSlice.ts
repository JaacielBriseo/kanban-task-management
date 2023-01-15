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
			const newStatusId = newStatus === 'Todo' ? 0 : newStatus === 'Doing' ? 1 : 2;
			const newColumn = newStatus === 'Todo' ? 0 : newStatus === 'Doing' ? 1 : 2;

			const task = state.boards[boardId].columns[columnId].tasks[taskId];
			task.statusId = newStatusId;
			task.status = newStatus;
			const updatedTasks = state.boards[boardId].columns[columnId].tasks.filter((task, index) => index !== taskId);
			state.boards[boardId].columns[columnId].tasks = [...updatedTasks];
			state.boards[boardId].columns[newColumn].tasks.push(task);
			state.selectedColumnId = newColumn;
			state.selectedTaskId = taskId;
			state.selectedBoardId = boardId;
		},
		addNewTask: (state, { payload }: { payload: { newTask: Task; boardId: number; columnId: number } }) => {
			const { boardId, columnId, newTask } = payload;
			state.boards[boardId].columns[columnId].tasks.push(newTask);
		},
	},
});

// Action creators are generated for each case reducer function
export const { addNewTask, setSelectedBoardId, setSelectedTask, toggleIsSubtaskCompleted, changeTaskColumnAndStatus } =
	kanbanTaskSlice.actions;
