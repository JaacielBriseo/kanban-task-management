import { createSlice } from '@reduxjs/toolkit';
import data from '../../data/data.json';
import { KanbanSliceInitialValues } from '../../interfaces';
//* use current from @reduxjs/toolkit if need to use console.log
const initialState: KanbanSliceInitialValues = {
	boards: null,
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
	reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = kanbanTaskSlice.actions;
