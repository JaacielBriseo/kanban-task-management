import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../store';
import { KanbanRoutes } from '../kanban/routes';
import { useAuthStore } from '../hooks';
import { Loading } from '../auth/components/Loading';
import { AuthRoutes } from '../auth/routes/AuthRoutes';

export const AppRoutes = () => {
	const { status, checkAuthToken } = useAuthStore();
	useEffect(() => {
		checkAuthToken();
		// eslint-disable-next-line
	}, []);
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
