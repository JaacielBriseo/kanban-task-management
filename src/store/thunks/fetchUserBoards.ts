import { createAsyncThunk } from '@reduxjs/toolkit';
import { boardsApi } from '../../api/boardsApi';
import { Board } from '../../interfaces';

export const fetchUserBoards = createAsyncThunk('boards/fetch', async () => {
	try {
		const response = await boardsApi.get<{ boards: Board[] }>('/boards');
		console.log(response.data.boards);
		return response.data.boards;
	} catch (err) {
		console.log(err);
		return [];
	}
});
