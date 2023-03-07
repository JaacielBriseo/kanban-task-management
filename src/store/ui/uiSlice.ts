import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ModalName } from '../../interfaces';
interface UiStoreValues {
	activeModalName: ModalName;
	isSidebarOpen: boolean;
	isLoading: boolean;
	errorMessage: string | null;
}
const initialState: UiStoreValues = {
	activeModalName: null,
	isSidebarOpen: false,
	isLoading: false,
	errorMessage: null,
};
export const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setActiveModalName: (state, action: PayloadAction<ModalName>) => {
			state.activeModalName = action.payload;
		},
		setIsSidebarOpen: (state, action: PayloadAction<boolean>) => {
			state.isSidebarOpen = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setActiveModalName, setIsSidebarOpen } = uiSlice.actions;
