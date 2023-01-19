import axios from 'axios';
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, login, logout } from '../../store';

export const Login = () => {
	const dispatch = useAppDispatch();
	const { handleChange, values, handleSubmit } = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: async () => {
			try {
				const { data } = await axios.post('http://localhost:4000/api/auth', {
					email: values.email,
					password: values.password,
				});
				console.log(data);
				dispatch(login({ displayName: data.name, email: values.email, photoURL: '', uid: values.password }));
			} catch (error) {
				dispatch(logout({ errorMessage: error as string }));
			}
		},
	});

	return (
		<div className='h-screen flex items-center justify-center bg-LightGrey'>
			<form className='bg-white rounded-lg shadow-md p-6' onSubmit={handleSubmit}>
				<h2 className='text-lg font-medium mb-4 text-MainPurple'>Login</h2>
				<div className='mb-4'>
					<label className='block text-MediumGrey font-medium mb-2' htmlFor='email'>
						Email
					</label>
					<input
						className='w-full border border-LinesLight p-2 rounded-lg'
						type='email'
						name='email'
						value={values.email}
						onChange={handleChange}
						required
					/>
				</div>
				<div className='mb-4'>
					<label className='block text-MediumGrey font-medium mb-2' htmlFor='password'>
						Password
					</label>
					<input
						className='w-full border border-LinesLight p-2 rounded-lg'
						type='password'
						name='password'
						value={values.password}
						onChange={handleChange}
						required
					/>
				</div>
				<button
					type='submit'
					className='bg-MainPurple hover:bg-PurpleHover text-white font-medium py-2 px-4 rounded-lg'>
					Log in
				</button>
				<button
					type='button'
					className='bg-white hover:bg-LinesLight text-MainPurple font-medium py-2 px-4 rounded-lg mt-4'>
					Sign in with Google
				</button>
				<div className='text-MediumGrey text-center mt-4'>
					Don't have an account yet?
					<NavLink to='/auth/register' className='text-MainPurple hover:text-PurpleHover font-medium underline'>
						Register
					</NavLink>
				</div>
			</form>
		</div>
	);
};
