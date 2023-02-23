import { Navigate, Route, Routes } from 'react-router-dom';
import { KanbanRoutes } from '../kanban/routes';
import { Loading } from '../auth/components/Loading';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { useAuthStore } from '../hooks';

export const AppRoutes = () => {
	const { status } = useAuthStore();
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
