import { createAsyncThunk } from '@reduxjs/toolkit';
import { boardsApi } from '../../api/boardsApi';

export const fetchUserBoards = createAsyncThunk('boards/fetch', async () => {
	try {
		const response = await boardsApi.get('/boards');
		console.log(response.data.boards);
		return response.data.boards;
	} catch (err) {
		console.log(err);
		return [];
	}
});
