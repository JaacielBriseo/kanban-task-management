import axios from 'axios';
export const boardsApi = axios.create({
	baseURL: 'http://localhost:4000/api/boards',
});
