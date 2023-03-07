import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../hooks';

export const Profile = () => {
	const { email, img, name, status } = useAuthStore();
	return (
		<section className='flex h-screen items-center justify-center '>
			<NavLink to={'/'} className='fixed top-4 left-2'>Go back to my boards</NavLink>
			<div className='bg-white h-3/4 w-10/12 shadow-lg rounded-lg flex flex-col justify-between items-center border-MainPurple border-2'>
				<div className='ring-2 ring-MainPurple rounded-full h-20 w-20 mt-4'>
					<img src={img || ''} alt='User' />
				</div>
				<div className='bg-LightGrey w-full flex flex-col items-center justify-center space-y-10 h-3/4'>
					<h1>Name: {name}</h1>
					<h2>Status: {status}</h2>
					<h3>Email: {email}</h3>
				</div>
			</div>
		</section>
	);
};
