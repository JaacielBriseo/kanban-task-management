import { createSlice } from '@reduxjs/toolkit';
import data from '../../data/data.json';
import { KanbanSliceInitialValues, Task, Board } from '../../interfaces';

const initialState: KanbanSliceInitialValues = {
	...data,
	selectedBoardId: 0,
	selectedColumnId: 0,
	selectedSubtaskId: 0,
	selectedTaskId: 0,
	activeBoard: {} as Board,
	activeTask: {} as Task,
};
if (initialState.selectedBoardId !== null) {
	initialState.activeBoard = initialState.boards[initialState.selectedBoardId];
}
if (initialState.selectedTaskId !== null) {
	initialState.activeTask =
		initialState.boards[initialState.selectedBoardId].columns[initialState.selectedColumnId].tasks[
			initialState.selectedTaskId
		];
}
export const kanbanTaskSlice = createSlice({
	name: 'kanbanTask',
	initialState,

	reducers: {
		setSelectedBoardId: (state, { payload }: { payload: number }) => {
			state.selectedBoardId = payload;
			state.activeBoard = state.boards.find(board => board.boardId === state.selectedBoardId)!;
		},
		setSelectedTask: (state, { payload }: { payload: { columnId: number; taskId: number; task: Task } }) => {
			state.selectedTaskId = payload.taskId;
			state.activeTask = payload.task;
			state.selectedColumnId = payload.columnId;
		},
		toggleIsSubtaskCompleted: (
			state,
			{ payload }: { payload: { subtaskIndex: number; columnId: number; boardId: number; taskId: number } }
		) => {
			const { columnId, subtaskIndex, boardId, taskId } = payload;
			if (!state.activeTask) {
				throw new Error(`No Active Task ON [kanbanslice]`);
			}
			state.activeTask.subtasks[subtaskIndex].isCompleted = !state.activeTask.subtasks[subtaskIndex].isCompleted;
			state.boards[boardId].columns[columnId].tasks[taskId].subtasks[subtaskIndex].isCompleted =
				!state.boards[boardId].columns[columnId].tasks[taskId].subtasks[subtaskIndex].isCompleted;
		},
		changeTaskColumnAndStatus: (
			state,
			{ payload }: { payload: { newStatus: string; taskId: number; columnId: number; boardId: number } }
		) => {
			const { boardId, columnId, newStatus, taskId } = payload;
			const newColId = newStatus === 'Todo' ? 0 : newStatus === 'Doing' ? 1 : 2;
			const board = state.boards[boardId];
			const task = board.columns
				.map(col => col.tasks)
				.flat()
				.find(task => task.taskId === taskId);
			if (!task) {
				console.error('Task not found');
				return;
			}
			task.status = newStatus;
			const taskColumn = board.columns[columnId];
			taskColumn.tasks = taskColumn.tasks.filter(t => t.taskId !== taskId);
			const newColumn = board.columns[newColId];
			if (!newColumn) {
				board.columns.push({
					columnId: board.columns.length,
					name: newStatus,
					tasks: [{ ...task }],
				});
			} else {
				newColumn.tasks.push(task);
			}
			state.activeTask = task;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setSelectedBoardId, setSelectedTask, toggleIsSubtaskCompleted, changeTaskColumnAndStatus } =
	kanbanTaskSlice.actions;
