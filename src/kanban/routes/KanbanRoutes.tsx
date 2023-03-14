import { Navigate, Route, Routes } from 'react-router-dom';
import { useKanbanTaskUI } from '../../hooks';
import { Home, Profile } from '../pages';
import { ActiveModalContent, Board, Modal } from '../components';
import { KanbanLayout } from '../layout/KanbanLayout';
export const KanbanRoutes = () => {
	const { closeModal, activeModalName } = useKanbanTaskUI();
	return (
		<>
			<Routes>
				<Route path='/' element={<KanbanLayout />}>
					<Route index element={<Home />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/boards/:boardId' element={<Board />} />
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
