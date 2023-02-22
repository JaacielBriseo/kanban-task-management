import {
	toggleAddNewBoardModal,
	toggleDeleteBoardModal,
	toggleDeleteTaskModal,
	toggleSelectBoardModal,
	toggleViewTaskModal,
	useAppDispatch,
	useAppSelector,
} from '../../store';
import { AddNewBoard } from '../components/AddNewBoard';
import { Board } from '../components/Board';
import { EmptyBoard } from '../components/EmptyBoard';
import { Modal } from '../components/Modal';
import { Navbar } from '../components/Navbar';
import { SelectBoard } from '../components/SelectBoard';
import { Sidebar } from '../components/Sidebar';
import { ToggleSidebarButton } from '../components/ToggleSidebarButton';
import { findBoardById } from '../../helpers/findBoardById';
import { ViewTask } from '../components/ViewTask';
import { DeleteTask } from '../components/DeleteTask';
import { DeleteBoard } from '../components/DeleteBoard';

export const Home = () => {
	const { boards, selectedBoardId } = useAppSelector(state => state.kanbanTask);
	const {
		isDeleteBoardModalOpen,
		isSidebarOpen,
		isSelectBoardModalOpen,
		isAddNewBoardModalOpen,
		isViewTaskModalOpen,
		isDeleteTaskModalOpen,
	} = useAppSelector(state => state.ui);
	const dispatch = useAppDispatch();
	const selectedBoard = findBoardById(boards, selectedBoardId);

	return (
		<div className='overflow-y-hidden'>
			<Navbar />
			<div className='md:grid md:grid-cols-3'>
				{isSidebarOpen && <Sidebar className='md:col-span-1' />}
				<div className={`${isSidebarOpen ? 'md:col-span-2' : 'md:col-span-full'} overflow-y-hidden overflow-x-auto`}>
					{!selectedBoard ? (
						<h1 className='fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] headingL text-center text-MediumGrey'>
							Select a board to display
						</h1>
					) : selectedBoard.columns.length ? (
						<Board board={selectedBoard} />
					) : (
						<EmptyBoard />
					)}
				</div>
			</div>
			<ToggleSidebarButton />
			{isSelectBoardModalOpen && (
				<Modal
					isFullScreen={false}
					onClose={() => dispatch(toggleSelectBoardModal())}
					customClass='w-[264px] h-[300px]'>
					<SelectBoard />
				</Modal>
			)}
			{isAddNewBoardModalOpen && (
				<Modal onClose={() => dispatch(toggleAddNewBoardModal())}>
					<AddNewBoard />
				</Modal>
			)}
			{isViewTaskModalOpen && (
				<Modal onClose={() => dispatch(toggleViewTaskModal())}>
					<ViewTask />
				</Modal>
			)}
			{isDeleteTaskModalOpen && (
				<Modal onClose={() => dispatch(toggleDeleteTaskModal())}>
					<DeleteTask />
				</Modal>
			)}
			{isDeleteBoardModalOpen && (
				<Modal onClose={() => dispatch(toggleDeleteBoardModal())}>
					<DeleteBoard />
				</Modal>
			)}
		</div>
	);
};
