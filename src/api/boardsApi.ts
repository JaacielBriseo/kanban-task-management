import axios, { AxiosRequestConfig } from 'axios';
export const boardsApi = axios.create({
	baseURL: 'http://localhost:4000/api/boards',
});
boardsApi.interceptors.request.use((config: AxiosRequestConfig) => {
	config.headers['x-token'] = localStorage.getItem('token');
	return config;
});
