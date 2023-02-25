import axios, { AxiosRequestConfig } from 'axios';
export const usersApi = axios.create({
	baseURL: 'http://localhost:4000/api',
});

usersApi.interceptors.request.use((config: AxiosRequestConfig) => {
	config.headers['x-token'] = localStorage.getItem('token');
	return config;
});
