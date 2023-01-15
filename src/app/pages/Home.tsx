import { SelectBoardModal, Header } from '../../ui';
import { Board } from '../Board';
import { TaskView } from '../TaskView';
import { useAppSelector } from '../../store/rtk-hooks';
import { AddNewTaskModal } from '../AddNewTask';
export const Home = () => {
	const { isTaskViewModalOpen, isAddNewTaskModalOpen } = useAppSelector(state => state.ui);
	return (
		<main className='font-Jakarta min-h-screen bg-LightGrey dark:bg-VeryDarkGrey'>
			<Header />
			<SelectBoardModal />
			{isTaskViewModalOpen && <TaskView />}
			{isAddNewTaskModalOpen && <AddNewTaskModal />}
			<Board />
		</main>
	);
};
