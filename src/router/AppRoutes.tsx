import { Navigate, Route, Routes } from 'react-router-dom';
import { KanbanRoutes } from '../app/routes';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { useAppSelector } from '../store';
import { Loading } from '../ui';

export const AppRoutes = () => {
	const { status } = useAppSelector(state => state.auth);
	if (status === 'checking') {
		return <Loading />;
	}
	return (
		<Routes>
			{status === 'authenticated' ? (
				<Route path='/*' element={<KanbanRoutes />} />
			) : (
				<Route path='/auth/*' element={<AuthRoutes />} />
			)}

			<Route path='/*' element={<Navigate to='/auth/login' />} />
		</Routes>
	);
};
