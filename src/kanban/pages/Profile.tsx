import { useAuthStore } from '../../hooks';

export const Profile = () => {
	const { email, img, name, isActive } = useAuthStore();
	return (
		<section className='flex flex-1 items-center justify-center'>
			<div className='bg-MainPurple h-3/4 w-10/12 shadow-lg rounded-lg flex flex-col justify-between items-center'>
				<div className='ring-2 ring-MainPurple rounded-full h-20 w-20 mt-4'>
					<img src={img || ''} alt='User' />
				</div>
				<div className='bg-White w-full flex flex-col items-center justify-center space-y-10 h-3/4'>
					<h1>Name: {name}</h1>
					<h2>Status: {isActive}</h2>
					<h3>Email: {email}</h3>
				</div>
			</div>
		</section>
	);
};

export default Profile