import { Route, Routes } from 'react-router-dom';
import { KanbanRoutes } from '../app/routes';

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path='*' element={<KanbanRoutes />} />
		</Routes>
	);
};
