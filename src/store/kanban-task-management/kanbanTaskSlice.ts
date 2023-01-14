import { createSlice } from '@reduxjs/toolkit';
import data from '../../data/data.json';
import { KanbanSliceInitialValues, Task } from '../../interfaces';
//* use current from @reduxjs/toolkit if need to use console.log
const initialState: KanbanSliceInitialValues = {
	...data,
	selectedBoardId: null,
	selectedColumnId: null,
	selectedSubtaskId: null,
	selectedTaskId: null,
	activeBoard: null,
	activeTask: null,
};
export const kanbanTaskSlice = createSlice({
	name: 'kanbanTask',
	initialState,
	reducers: {
		setSelectedBoardId: (state, { payload }: { payload: number }) => {
			state.selectedBoardId = payload;
			state.activeBoard = state.boards[payload];
		},
		setSelectedTask: (state, { payload }: { payload: { columnId: number; taskId: number; task: Task } }) => {
			state.selectedTaskId = payload.taskId;
			state.activeTask = payload.task;
			state.selectedColumnId = payload.columnId;
		},
		toggleIsSubtaskCompleted: (
			state,
			{ payload }: { payload: { subtaskIndex: number; boardId: number; columnId: number; taskId: number } }
		) => {
			const { subtaskIndex, boardId, columnId, taskId } = payload;
			if (state.activeTask === null) {
				console.error('No active task to toggle completed subtask');
				return;
			}
			state.activeTask.subtasks[subtaskIndex].isCompleted = !state.activeTask?.subtasks[subtaskIndex].isCompleted;
			state.boards[boardId].columns[columnId].tasks[taskId].subtasks[subtaskIndex].isCompleted =
				!state.boards[boardId].columns[columnId].tasks[taskId].subtasks[subtaskIndex].isCompleted;
			if (state.activeBoard === null) {
				console.error('No active board to toggle completed subtask');
				return;
			}
			state.activeBoard.columns[columnId].tasks[taskId].subtasks[subtaskIndex].isCompleted =
				!state.activeBoard?.columns[columnId].tasks[taskId].subtasks[subtaskIndex].isCompleted;
		},
		changeTaskColumnAndStatus: (
			state,
			{ payload }: { payload: { newStatus: string; taskId: number; columnId: number; boardId: number } }
		) => {
			const { boardId, columnId, newStatus, taskId } = payload;
			const newStatusId = newStatus === 'Todo' ? 0 : newStatus === 'Doing' ? 1 : 2;
			const newColumn = newStatus === 'Todo' ? 0 : newStatus === 'Doing' ? 1 : 2;
			if (state.activeTask === null) return;
			const newTask = { ...state.activeTask, status: newStatus, statusId: newStatusId };
			state.activeTask = newTask;
			if (state.activeBoard === null) return;
			state.activeBoard.columns[newColumn].tasks.push(newTask);
			state.activeBoard.columns[columnId].tasks = state.activeBoard.columns[columnId].tasks.filter(
				task => task.taskId !== taskId
			);
			state.boards[boardId].columns[columnId].tasks = state.boards[boardId].columns[columnId].tasks.filter(
				task => task.taskId !== taskId
			);
		},
	},
});

// Action creators are generated for each case reducer function
export const { setSelectedBoardId, setSelectedTask, toggleIsSubtaskCompleted, changeTaskColumnAndStatus } =
	kanbanTaskSlice.actions;
