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
			dispatch(
				login({
					email,
					google: data.user.google,
					img: data.user.img,
					isActive: data.user.isActive,
					name: data.user.name,
					role: data.user.role,
					uid: data.user.uid,
				})
			);
			// dispatch(fetchBoards(data.uid));
		} catch (error) {
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
				dispatch(
					login({
						email,
						google: data.user.google,
						img: data.user.img,
						isActive: data.user.isActive,
						name,
						role: data.user.role,
						uid: data.user.uid,
					})
				);
			}
		} catch (error) {
			console.log(error);
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
		startLogin,
		startRegister,
	};
};
