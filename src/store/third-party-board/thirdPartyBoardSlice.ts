import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Board } from '../../interfaces';
interface InitialStateValues {
  board:Board | null
}
const initialState:InitialStateValues ={
  board:null
}
export const thirdPartyBoardSlice = createSlice({
    name: 'thirdPartyBoard',
    initialState,
    reducers: {
        setThirdPartyBoard: (state,action:PayloadAction<Board>) => {
            state.board = action.payload;
        },
    }
});


// Action creators are generated for each case reducer function
export const { setThirdPartyBoard } = thirdPartyBoardSlice.actions;