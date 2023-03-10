import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useKanbanTaskUI } from '../../hooks';
import { Home } from '../pages';
import { ActiveModalContent, Modal } from '../components';
import { KanbanLayout } from '../layout/KanbanLayout';
export const KanbanRoutes = () => {
	const { closeModal, activeModalName } = useKanbanTaskUI();
	const Profile = lazy(() => import('../pages/Profile'));
	const Board = lazy(() => import('../components/Board'));
	return (
		<>
			<Routes>
				<Route path='/' element={<KanbanLayout />}>
					<Route index element={<Home />} />
					<Route
						path='/profile'
						element={
							<Suspense fallback={<span>loading...</span>}>
								<Profile />
							</Suspense>
						}
					/>
					<Route
						path='/boards/:boardId'
						element={
							<Suspense fallback={<span>loading...</span>}>
								<Board />
							</Suspense>
						}
					/>
					<Route path='*' element={<Navigate to={'/'} replace />} />
				</Route>
			</Routes>

			{activeModalName && (
				<Modal
					onClose={closeModal}
					isFullScreen={activeModalName !== 'SelectBoard'}
					customClass={activeModalName === 'SelectBoard' ? 'w-[264px] h-[300px]' : ''}>
					{<ActiveModalContent />}
				</Modal>
			)}
		</>
	);
};
