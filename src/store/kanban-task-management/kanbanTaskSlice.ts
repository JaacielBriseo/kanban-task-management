import { createSlice } from '@reduxjs/toolkit';
import { KanbanSliceInitialValues } from '../../interfaces';
import data from '../../data/data.json';
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
		setSelectedBoardId: (state, { payload }:{payload:string}) => {
			state.selectedBoardId = payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {setSelectedBoardId} = kanbanTaskSlice.actions;
