import { Navigate, Route, Routes } from 'react-router-dom';
import { Home, Profile } from '../pages';
export const KanbanRoutes = () => {
	return (
		<Routes>
			<Route path='/home' element={<Home />} />
			<Route path='/profile' element={<Profile />} />
			<Route path='/*' element={<Navigate to='/home' />} />
		</Routes>
	);
};
