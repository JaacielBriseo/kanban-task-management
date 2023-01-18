import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const Register = () => {
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isReady, setIsReady] = useState(false);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

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
						name='full-name'
						value={fullName}
						onChange={e => setFullName(e.target.value)}
						required
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
						value={email}
						onChange={e => setEmail(e.target.value)}
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
						value={password}
						onChange={e => setPassword(e.target.value)}
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
						name='confirm-password'
						value={confirmPassword}
						onChange={e => setConfirmPassword(e.target.value)}
						required
					/>
				</div>
				<div className='mb-4'>
					<input
						className='mr-2'
						type='checkbox'
						name='is-ready'
						checked={isReady}
						onChange={e => setIsReady(e.target.checked)}
					/>
					<label className='text-MediumGrey' htmlFor='is-ready'>
						Are you ready to get into the best app in the world?
					</label>
				</div>
				<button className='bg-MainPurple hover:bg-PurpleHover text-white font-medium py-2 px-4 rounded-lg'>
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
