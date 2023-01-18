import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

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
				<button className='bg-MainPurple hover:bg-PurpleHover text-white font-medium py-2 px-4 rounded-lg'>
					Log in
				</button>
				<button className='bg-white hover:bg-LinesLight text-MainPurple font-medium py-2 px-4 rounded-lg mt-4'>
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
