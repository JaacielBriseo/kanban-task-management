import { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import { registerSchema } from '../validations/schemas';
import { useAuthStore } from '../../hooks';

export const Register = () => {
	const { clearErrorMessage, startRegister, errorMessage } = useAuthStore();
	const inputRef = useRef<HTMLInputElement | null>(null);

	const { handleSubmit, values, handleChange, errors } = useFormik({
		initialValues: {
			name: '',
			nickname: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		onSubmit: ({email,name,password,nickname}) => {
			startRegister({ email, name, password, nickname });
		},
		validationSchema: registerSchema,
	});

	useEffect(() => {
		if (!inputRef) return;
		inputRef.current?.focus();
	}, []);
	return (
		<div className='h-screen flex items-center justify-center bg-LightGrey p-5'>
			<form className='bg-White rounded-lg shadow-md p-6 w-11/12 max-w-[600px]' onSubmit={handleSubmit}>
				<h2 className='text-lg font-medium mb-4 text-MainPurple headingL'>Register</h2>
				<div className='mb-4'>
					<label className='block text-MediumGrey font-medium mb-2' htmlFor='full-name'>
						Full Name &nbsp;
						{errors.name && <small className='text-SoftRed'>{errors.name}</small>}
					</label>
					<input
						className='w-full border border-LinesLight p-2 rounded-lg'
						type='text'
						name='name'
						value={values.name}
						onChange={handleChange}
						ref={inputRef}
					/>
				</div>
				<div className='mb-4'>
					<label className='block text-MediumGrey font-medium mb-2' htmlFor='nickname'>
						Nickname <small>(optional)</small>
					</label>
					<input
						className='w-full border border-LinesLight p-2 rounded-lg'
						type='text'
						name='nickname'
						value={values.nickname}
						onChange={handleChange}
					/>
				</div>
				<div className='mb-4'>
					<label className='block text-MediumGrey font-medium mb-2' htmlFor='email'>
						Email &nbsp; {errors.email && <small className='text-SoftRed'>{errors.email}</small>}
					</label>
					<input
						className='w-full border border-LinesLight p-2 rounded-lg'
						type='email'
						name='email'
						value={values.email}
						onChange={handleChange}
					/>
				</div>
				<div className='mb-4'>
					<label className='block text-MediumGrey font-medium mb-2' htmlFor='password'>
						Password &nbsp; {errors.password && <small className='text-SoftRed'>{errors.password}</small>}
					</label>
					<input
						className='w-full border border-LinesLight p-2 rounded-lg'
						type='password'
						name='password'
						value={values.password}
						onChange={handleChange}
					/>
				</div>
				<div className='mb-4'>
					<label className='block text-MediumGrey font-medium mb-2' htmlFor='confirm-password'>
						Confirm Password &nbsp;{' '}
						{errors.confirmPassword && <small className='text-SoftRed'>{errors.confirmPassword}</small>}
					</label>
					<input
						className='w-full border border-LinesLight p-2 rounded-lg'
						type='password'
						name='confirmPassword'
						value={values.confirmPassword}
						onChange={handleChange}
					/>
				</div>
				{errorMessage && <small className='text-SoftRed'>{errorMessage}</small>}
				<button
					type='submit'
					className='bg-MainPurple hover:bg-PurpleHover text-white font-medium py-2 px-4 rounded-lg w-full'>
					Register
				</button>
				<div className='text-MediumGrey text-center mt-4'>
					Already have an account?
					<NavLink
						to='/auth/login'
						onClick={clearErrorMessage}
						className='text-MainPurple hover:text-PurpleHover font-medium underline'>
						Log in
					</NavLink>
				</div>
			</form>
		</div>
	);
};
