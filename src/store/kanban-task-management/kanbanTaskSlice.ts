import { createSlice } from '@reduxjs/toolkit';
import data from '../../data/data.json';
import { findBoardIndex, findColumnByName, findColumnIndex, findTaskIndex, toggleCompleted } from '../../helpers';
import {
	AddNewTaskPayload,
	Board,
	ChangeTaskColumnAndStatusPayload,
	DeleteTaskPayload,
	KanbanSliceInitialValues,
	SetSelectedColumnAndTaskIdPayload,
	Task,
	ToggleIsSubtaskCompletedPayLoad,
} from '../../interfaces';
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
		setSelectedBoardId: (state, { payload }: { payload: string }) => {
			state.selectedBoardId = payload;
		},
		setSelectedColumnAndTaskId: (state, { payload }: SetSelectedColumnAndTaskIdPayload) => {
			const { columnId, taskId } = payload;
			state.selectedColumnId = columnId;
			state.selectedTaskId = taskId;
		},
		addNewBoard: (state, { payload }: { payload: Board }) => {
			const { boardId, columns, name } = payload;
			state.boards.push({ boardId, columns, name });
		},
		editBoard: (state, { payload }: { payload: { boardId: string } }) => {
			const {boardId} = payload
			// const boardIdx = findBoardIndex(state.boards,boardId)
			// const updatedBoard = state.boards[boardIdx]
		},
		toggleIsSubtaskCompleted: (state, { payload }: ToggleIsSubtaskCompletedPayLoad) => {
			const { subtaskIndex, boardId, columnId, taskId } = payload;
			const boardIdx = findBoardIndex(state.boards, boardId);
			const columnIdx = findColumnIndex(state.boards[boardIdx].columns, columnId);
			const taskIdx = findTaskIndex(state.boards[boardIdx].columns[columnIdx].tasks, taskId);
			const subtask = state.boards[boardIdx].columns[columnIdx].tasks[taskIdx].subtasks[subtaskIndex];
			toggleCompleted(subtask);
		},
		changeTaskColumnAndStatus: (state, { payload }: ChangeTaskColumnAndStatusPayload) => {
			const { boardId, columnId, newStatus, taskId ,columnName} = payload;
			const boardIdx = findBoardIndex(state.boards, boardId);
			const columnIdx = findColumnIndex(state.boards[boardIdx].columns, columnId);
			const task = state.boards[boardIdx].columns[columnIdx].tasks.find(task => task.taskId === taskId);
			if (!task) return;
			task.status = newStatus;
			const currentColumn = state.boards[boardIdx].columns[columnIdx];
			currentColumn.tasks = currentColumn.tasks.filter(t => t.taskId !== taskId);
			const newColumn = state.boards[boardIdx].columns.find(col => col.name === columnName);
			if (!newColumn) return;
			newColumn.tasks.push(task);
			if (state.selectedColumnId === columnId) {
				state.selectedColumnId = newColumn.columnId;
			}
		},
		addNewTask: (state, { payload }: AddNewTaskPayload) => {
			const { boardId, columnName, newTask } = payload;
			const boardIdx = findBoardIndex(state.boards, boardId);
			const columnIdx = findColumnByName(state.boards[boardIdx], columnName);
			state.boards[boardIdx].columns[columnIdx].tasks.push(newTask);
		},
		deleteTask: (state, { payload }: DeleteTaskPayload) => {
			const { boardId, taskId, columnId } = payload;
			const boardIdx = findBoardIndex(state.boards, boardId);
			const columnIdx = findColumnIndex(state.boards[boardIdx].columns, columnId);
			state.boards[boardIdx].columns[columnIdx].tasks = state.boards[boardIdx].columns[columnIdx].tasks.filter(
				task => task.taskId !== taskId
			);
		},
		editTask: (
			state,
			{ payload }: { payload: { boardId: string; columnId: string; taskId: string; taskData: Task } }
		) => {
			const { boardId, columnId, taskId, taskData } = payload;
			const boardIdx = findBoardIndex(state.boards, boardId);
			const columnIdx = findColumnIndex(state.boards[boardIdx].columns, columnId);
			const taskIndex = findTaskIndex(state.boards[boardIdx].columns[columnIdx].tasks, taskId);
			state.boards[boardIdx].columns[columnIdx].tasks[taskIndex] = { ...taskData };
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	addNewBoard,
	addNewTask,
	changeTaskColumnAndStatus,
	deleteTask,
	editTask,
	setSelectedBoardId,
	setSelectedColumnAndTaskId,
	toggleIsSubtaskCompleted,
} = kanbanTaskSlice.actions;
