import { Navigate, Route, Routes } from 'react-router-dom';
import { KanbanRoutes } from '../kanban/routes';
import { Loading } from '../auth/components/Loading';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { useAuthStore } from '../hooks';
import { useAppSelector } from '../store/rtk-hooks';
import { useEffect } from 'react';

export const AppRoutes = () => {
	const { status, checkAuthToken } = useAuthStore();
	const { isLoading } = useAppSelector(state => state.kanbanTask);
	useEffect(() => {
		checkAuthToken();
	}, []);
	if (status === 'checking' || isLoading) {
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
