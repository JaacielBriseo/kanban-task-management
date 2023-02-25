import { checkingCredentials, login, logout, useAppDispatch, useAppSelector } from '../store';
import { usersApi } from '../api/usersApi';
// import { fetchBoards } from '../store/thunks/fetchUserBoards';
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
			const { user } = data;
			localStorage.setItem('token', data.token);
			localStorage.setItem('token-init-date', new Date().getTime().toString());
			dispatch(
				login({
					email,
					google: user.google,
					img: user.img,
					isActive: user.isActive,
					name: user.name,
					role: user.role,
					uid: user.uid,
				})
			);
			// dispatch(fetchBoards(data.uid));
		} catch (error) {
			dispatch(logout({ errorMessage: `Ocurrio algun error : ${error}}` }));
		}
	};
	const startGoogleSignIn = async (response: any) => {
		try {
			const { data } = await usersApi.post('/auth/google', {
				id_token: response.credential,
			});
			const { user } = data;
			dispatch(
				login({
					email: user.email,
					google: user.google,
					img: user.img,
					isActive: user.isActive,
					name: user.name,
					role: user.role,
					uid: user.uid,
				})
			);
		} catch (error) {
			console.error(error);

			dispatch(logout({ errorMessage: `Ocurrio algun error : ${error}}` }));
		}
	};
	const startRegister = async ({ name, email, password }: { name: string; email: string; password: string }) => {
		dispatch(checkingCredentials());
		try {
			const { data } = await usersApi.post('/users/register', {
				name,
				email,
				password,
				img: '',
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
						img: user.img,
						isActive: user.isActive,
						name,
						role: user.role,
						uid: user.uid,
					})
				);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const checkAuthToken = async () => {
		dispatch(checkingCredentials());
		const token = localStorage.getItem('token');
		if (!token) return dispatch(logout({ errorMessage: `No token.` }));
		try {
			const { data } = await usersApi.get('/auth/renew');
			localStorage.setItem('token', data.token);
			localStorage.setItem('token-init-date', new Date().getTime().toString());
			const { user } = data;
			dispatch(
				login({
					email: user.email,
					google: user.google,
					img: user.img,
					isActive: user.isActive,
					name: user.name,
					role: user.role,
					uid: user._id,
				})
			);
		} catch (error) {
			dispatch(logout({ errorMessage: `Some error:${error}` }));
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
	};
};
