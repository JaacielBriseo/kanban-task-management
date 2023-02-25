import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import { useAuthStore } from '../../hooks';
import { useRef, useEffect } from 'react';

export const Register = () => {
	const { startRegister } = useAuthStore();
	const inputRef = useRef<HTMLInputElement | null>(null);
	const { handleSubmit, values, handleChange } = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
			isReady: false,
		},
		onSubmit: () => {
			startRegister({ email: values.email, name: values.name, password: values.password });
		},
	});
	useEffect(() => {
		if (!inputRef) return;
		inputRef.current?.focus();
	}, []);

	return (
		<div className='h-screen flex items-center justify-center bg-LightGrey p-5'>
			<form className='bg-White rounded-lg shadow-md p-6' onSubmit={handleSubmit}>
				<h2 className='text-lg font-medium mb-4 text-MainPurple'>Register</h2>
				<div className='mb-4'>
					<label className='block text-MediumGrey font-medium mb-2' htmlFor='full-name'>
						Full Name
					</label>
					<input
						className='w-full border border-LinesLight p-2 rounded-lg'
						type='text'
						name='name'
						value={values.name}
						onChange={handleChange}
						required
						ref={inputRef}
					/>
				</div>
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
				<div className='mb-4'>
					<label className='block text-MediumGrey font-medium mb-2' htmlFor='confirm-password'>
						Confirm Password
					</label>
					<input
						className='w-full border border-LinesLight p-2 rounded-lg'
						type='password'
						name='confirmPassword'
						value={values.confirmPassword}
						onChange={handleChange}
						required
					/>
				</div>
				<div className='mb-4'>
					<input className='mr-2' type='checkbox' name='isReady' checked={values.isReady} onChange={handleChange} />
					<label className='text-MediumGrey' htmlFor='isReady'>
						Are you ready to get into the best app in the world?
					</label>
				</div>
				<button
					type='submit'
					className='bg-MainPurple hover:bg-PurpleHover text-white font-medium py-2 px-4 rounded-lg'>
					Register
				</button>
				<div className='text-MediumGrey text-center mt-4'>
					Already have an account?
					<NavLink to='/auth/login' className='text-MainPurple hover:text-PurpleHover font-medium underline'>
						Log in
					</NavLink>
				</div>
			</form>
		</div>
	);
};
