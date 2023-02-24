import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Board } from '../../interfaces';

export const fetchBoards = createAsyncThunk('boards/fetch', async (uid: string) => {
	try {
		const response = await axios.get<Board[]>('http://localhost:4000/api/boards', {
			headers: { userId: uid },
		});
		return response.data;
	} catch (err) {
		console.log(err);
		return [];
	}
});
