import { Navigate, Route, Routes } from 'react-router-dom';
import { Home, Profile, ThirdPartyBoard } from '../pages';
export const KanbanRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/profile' element={<Profile />} />
			<Route path='/thirdPartyBoard' element={<ThirdPartyBoard />} />
			<Route path='/*' element={<Navigate to='/' />} />
		</Routes>
	);
};
