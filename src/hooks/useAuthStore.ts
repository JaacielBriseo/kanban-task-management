import { checkingCredentials, login, logout, useAppDispatch, useAppSelector, fetchUserBoards } from '../store';
import { usersApi } from '../api/usersApi';
import axios from 'axios';
export const useAuthStore = () => {
	const { errorMessage, status, user } = useAppSelector(state => state.auth);
	const { email, google, img, isActive, name, role, uid } = user;
	const dispatch = useAppDispatch();

	const startLogin = async ({ email, password }: { email: string; password: string }) => {
		dispatch(checkingCredentials());
		try {
			const { data } = await usersApi.post('/auth/login', {
				email: email,
				password: password,
			});
			const { google, img, isActive, name, role, uid, nickname } = data.user;
			localStorage.setItem('token', data.token);
			localStorage.setItem('token-init-date', new Date().getTime().toString());
			dispatch(
				login({
					email,
					google,
					img,
					isActive,
					name,
					nickname,
					role,
					uid,
				})
			);
			dispatch(fetchUserBoards());
		} catch (error) {
			if (axios.isAxiosError(error)) {
				dispatch(logout({ errorMessage: `${error.response?.data.msg}` }));
			}
			console.error(error);
		}
	};

	const clearErrorMessage = () => dispatch(logout({ errorMessage: null }));

	const startGoogleSignIn = async (response: any) => {
		try {
			const { data } = await usersApi.post('/auth/google', {
				id_token: response.credential,
			});
			const { email, google, img, isActive, name, role, uid } = data.user;
			dispatch(
				login({
					email,
					google,
					img,
					isActive,
					name,
					role,
					uid,
				})
			);
		} catch (error) {
			console.error(error);

			dispatch(logout({ errorMessage: `Some error : ${error}}` }));
		}
	};
	const startRegister = async ({
		name,
		email,
		password,
		nickname,
	}: {
		name: string;
		email: string;
		password: string;
		nickname: string;
	}) => {
		dispatch(checkingCredentials());
		try {
			const { data } = await usersApi.post('/users/register', {
				name,
				email,
				nickname,
				password,
				img: '/assets/profile.png',
				role: 'USER_ROLE',
			});
			if (data) {
				localStorage.setItem('token', data.token);
				localStorage.setItem('token-init-date', new Date().getTime().toString());
				const { user } = data;
				dispatch(
					login({
						email,
						google: user.google,
						nickname: user.nickname,
						img: user.img,
						isActive: user.isActive,
						name,
						role: user.role,
						uid: user.uid,
					})
				);
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				dispatch(logout({ errorMessage: `${error.response?.data.msg || error.message}` }));
			}
			console.error(error);
		}
	};
	const checkAuthToken = async () => {
		dispatch(checkingCredentials());
		const token = localStorage.getItem('token');
		if (!token) return dispatch(logout({ errorMessage: null }));
		try {
			const { data } = await usersApi.get('/auth/renew');
			localStorage.setItem('token', data.token);
			localStorage.setItem('token-init-date', new Date().getTime().toString());
			const { email, google, img, isActive, name, role, uid } = data.user;
			dispatch(
				login({
					email,
					google,
					img,
					isActive,
					name,
					role,
					uid,
				})
			);
			dispatch(fetchUserBoards());
		} catch (error) {
			dispatch(logout({ errorMessage: null }));
		}
	};

	return {
		//Properties
		name,
		email,
		errorMessage,
		img,
		status,
		uid,
		role,
		isActive,
		google,

		//Methods
		checkAuthToken,
		startLogin,
		startRegister,
		startGoogleSignIn,

		clearErrorMessage,
	};
};
