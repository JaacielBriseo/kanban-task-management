import { PayloadAction, createSlice } from '@reduxjs/toolkit';
interface UiStoreValues {
	activeModalName: string | null;
	isSidebarOpen: boolean;
	selectedBoardId: string | null;
	selectedColumnId: string | null;
	selectedSubtaskId: string | null;
	selectedTaskId: string | null;
	isLoading: boolean;
	errorMessage: string | null;
}
const initialState: UiStoreValues = {
	activeModalName: null,
	isSidebarOpen: false,
	selectedBoardId: null,
	selectedColumnId: null,
	selectedSubtaskId: null,
	selectedTaskId: null,
	isLoading: false,
	errorMessage: null,
};
export const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setActiveModalName: (state, action: PayloadAction<string | null>) => {
			state.activeModalName = action.payload;
		},
		setIsSidebarOpen: (state, action: PayloadAction<boolean>) => {
			state.isSidebarOpen = action.payload;
		},
		setSelectedBoardId: (state, action: PayloadAction<string | null>) => {
			state.selectedBoardId = action.payload;
		},
		setSelectedColumnId: (state, action: PayloadAction<string | null>) => {
			state.selectedColumnId = action.payload;
		},
		setSelectedTaskId: (state, action: PayloadAction<string | null>) => {
			state.selectedTaskId = action.payload;
		},
		setSelectedSubtaskId: (state, action: PayloadAction<string | null>) => {
			state.selectedSubtaskId = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	setActiveModalName,
	setIsSidebarOpen,
	setSelectedBoardId,
	setSelectedColumnId,
	setSelectedSubtaskId,
	setSelectedTaskId,
} = uiSlice.actions;
