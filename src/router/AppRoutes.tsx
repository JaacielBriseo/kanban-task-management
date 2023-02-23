import { Navigate, Route, Routes } from 'react-router-dom';
import { KanbanRoutes } from '../kanban/routes';
import { useAppSelector } from '../store';
import { Loading } from '../auth/components/Loading';
import { AuthRoutes } from '../auth/routes/AuthRoutes';

export const AppRoutes = () => {
	const { status } = useAppSelector(state => state.auth);
	if (status === 'checking') {
		<Loading />;
	}
	return (
		<Routes>
      {status === 'authenticated' ? (
        <Route path="/*" element={<KanbanRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
	);
};
