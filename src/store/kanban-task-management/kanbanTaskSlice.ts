import { createSlice } from '@reduxjs/toolkit';
import data from '../../data/data.json';
import { InitialValuesSlice } from '../../interfaces';

const initialValues: InitialValuesSlice = { ...data, isSelectModalOpen: false };
export const kanbanTaskSlice = createSlice({
	name: 'kanbanTask',
	initialState: initialValues,
	reducers: {
		toggleBoardModal:(state)=> {
			state.isSelectModalOpen = !state.isSelectModalOpen
		}
	},
});

// Action creators are generated for each case reducer function
export const {toggleBoardModal} = kanbanTaskSlice.actions;
