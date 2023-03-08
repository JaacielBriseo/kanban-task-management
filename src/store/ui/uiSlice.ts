import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ModalName } from '../../interfaces';
interface UiStoreValues {
	activeModalName: ModalName;
	isSidebarOpen: boolean;
	isSavingChanges: 'loading' | 'successful' | 'error' | null;
	errorMessage: string | null;
}
const initialState: UiStoreValues = {
	activeModalName: null,
	isSidebarOpen: false,
	isSavingChanges: null,
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
		setIsSavingChanges: (state, action: PayloadAction<'loading' | 'successful' | 'error' | null>) => {
			state.isSavingChanges = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setActiveModalName, setIsSidebarOpen,setIsSavingChanges } = uiSlice.actions;
