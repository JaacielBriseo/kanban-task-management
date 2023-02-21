import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Board, KanbanSliceInitialValues } from '../../interfaces';
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
		setSelectedBoardId: (state, { payload }: { payload: string }) => {
			state.selectedBoardId = payload;
		},
		setSelectedTaskId: (state, action: PayloadAction<string>) => {
			state.selectedTaskId = action.payload;
		},
		setSelectedColumnId: (state, action: PayloadAction<string>) => {
			state.selectedColumnId = action.payload;
		},
		createNewBoard: (state, action: PayloadAction<Board>) => {
			state.boards.push(action.payload);
		},
	},
});

// Action creators are generated for each case reducer function
export const { createNewBoard, setSelectedBoardId, setSelectedTaskId, setSelectedColumnId } = kanbanTaskSlice.actions;
