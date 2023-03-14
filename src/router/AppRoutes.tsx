import { useEffect, lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '../hooks';
import { Loading } from '../auth/components/Loading';
import { AuthRoutes } from '../auth/routes/AuthRoutes';

export const AppRoutes = () => {
	const KanbanRoutes = lazy(() => import('../kanban/routes'));
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
				<Route
					path='/*'
					element={
						<Suspense fallback={<Loading />}>
							<KanbanRoutes />
						</Suspense>
					}
				/>
			) : (
				<Route path='/auth/*' element={<AuthRoutes />} />
			)}
			<Route path='/*' element={<Navigate to='/auth/login' />} />
		</Routes>
	);
};
