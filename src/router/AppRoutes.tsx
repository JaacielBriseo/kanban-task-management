import { Route, Routes } from 'react-router-dom';
import { KanbanRoutes } from '../kanban/routes';

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<KanbanRoutes />} />
			<Route path='*' element={<KanbanRoutes />} />
		</Routes>
	);
};
