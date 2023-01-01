import { createSlice } from '@reduxjs/toolkit';
import data from '../../data/data.json';
import { InitialValuesSlice } from '../../interfaces';

const initialValues: InitialValuesSlice = { ...data };
export const kanbanTaskSlice = createSlice({
	name: 'kanbanTask',
	initialState: initialValues,
	reducers: {
	
	},
});

// Action creators are generated for each case reducer function
export const {  } = kanbanTaskSlice.actions;
