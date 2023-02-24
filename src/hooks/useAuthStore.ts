import axios from 'axios';
import { checkingCredentials, login, logout, useAppDispatch, useAppSelector } from '../store';
import { fetchBoards } from '../store/thunks/fetchUserBoards';
export const useAuthStore = () => {
	const { displayName, email, errorMessage, photoURL, status, uid } = useAppSelector(state => state.auth);
	const dispatch = useAppDispatch();

	const startLogin = async ({ email, password }: { email: string; password: string }) => {
		dispatch(checkingCredentials());
		try {
			const { data } = await axios.post('http://localhost:4000/api/auth', {
				email: email,
				password: password,
			});
			dispatch(login({ displayName: data.name, email: email, photoURL: '', uid: data.uid }));
			dispatch(fetchBoards(data.uid));
		} catch (error) {
			dispatch(logout({ errorMessage: `Ocurrio algun error : ${error}}` }));
		}
	};
	const startRegister = async ({ name, email, password }: { name: string; email: string; password: string }) => {
		dispatch(checkingCredentials());
		try {
			const response = await axios.post('http://localhost:4000/api/auth/register', {
				name,
				email,
				password,
			});
			if (response) {
				dispatch(login({ displayName: response.data.name, email, photoURL: '', uid: response.data.uid }));
			}
		} catch (error) {
			console.log(error);
		}
	};
	return {
		//Properties
		displayName,
		email,
		errorMessage,
		photoURL,
		status,
		uid,
		//Methods
		startLogin,
		startRegister,
	};
};
