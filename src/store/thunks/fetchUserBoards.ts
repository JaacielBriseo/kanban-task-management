import { createAsyncThunk } from '@reduxjs/toolkit';
import { boardsApi } from '../../api/boardsApi';

export const fetchUserBoards = createAsyncThunk('boards/fetch', async () => {
	try {
		const response = await boardsApi.get('/');
		console.log(response);
		return response.data.userBoards;
	} catch (err) {
		console.log(err);
		return [];
	}
});
