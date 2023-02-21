import { toggleAddNewBoardModal, toggleSelectBoardModal, useAppDispatch, useAppSelector } from '../../store';
import { AddNewBoard } from '../components/AddNewBoard';
import { Board } from '../components/Board';
import { EmptyBoard } from '../components/EmptyBoard';
import { Modal } from '../components/Modal';
import { Navbar } from '../components/Navbar';
import { SelectBoard } from '../components/SelectBoard';
import { Sidebar } from '../components/Sidebar';
import { ToggleSidebarButton } from '../components/ToggleSidebarButton';

export const Home = () => {
	const { boards } = useAppSelector(state => state.kanbanTask);
	const { isSidebarOpen, isSelectBoardModalOpen, isAddNewBoardModalOpen } = useAppSelector(state => state.ui);
	const dispatch = useAppDispatch();
	return (
		<>
			<Navbar />
			<div className='md:grid md:grid-cols-3'>
				{isSidebarOpen && <Sidebar className='md:col-span-1' />}
				<div className={`${isSidebarOpen ? 'md:col-span-2' : 'md:col-span-3'}`}>
					{boards.length ? <Board /> : <EmptyBoard />}
				</div>
			</div>
			<ToggleSidebarButton />
			{isSelectBoardModalOpen && (
				<Modal onClose={() => dispatch(toggleSelectBoardModal())} customClass='w-[264px] h-[300px]'>
					<SelectBoard />
				</Modal>
			)}
			{isAddNewBoardModalOpen && (
				<Modal onClose={() => dispatch(toggleAddNewBoardModal())} customClass='w-[264px] h-[320px]'>
					<AddNewBoard />
				</Modal>
			)}
		</>
	);
};
