import { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import { useAuthStore } from '../../hooks';
// import { GoogleLogin } from '@react-oauth/google';
export const Login = () => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const { startLogin, startGoogleSignIn } = useAuthStore();
	useEffect(() => {
		if (!inputRef) return;
		inputRef.current?.focus();
	}, []);
	const { handleChange, values, handleSubmit } = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: () => {
			startLogin({ email: values.email, password: values.password });
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
						ref={inputRef}
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
				<div className='flex flex-col space-y-3'>
					<button
						type='submit'
						className='bg-MainPurple hover:bg-PurpleHover text-white font-medium py-2 px-4 rounded-lg'>
						Log in
					</button>
					<button type='button' className='mx-auto'>
						{/* <GoogleLogin onSuccess={startGoogleSignIn} /> */}
					</button>
				</div>
				<div className='text-MediumGrey text-center mt-4'>
					Don't have an account yet? &nbsp;
					<NavLink to='/auth/register' className='text-MainPurple hover:text-PurpleHover font-medium underline'>
						Register
					</NavLink>
				</div>
			</form>
		</div>
	);
};
