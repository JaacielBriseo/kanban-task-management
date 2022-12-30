import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages';
export const KanbanRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
		</Routes>
	);
};
