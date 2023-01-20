import { SelectBoardModal, Header } from '../../ui';
import { Board } from '../Board';
import { TaskView } from '../TaskView';
import { useAppSelector } from '../../store/rtk-hooks';
import { AddNewTaskModal } from '../AddNewTask';
import { EditTask } from '../EditTask';
import { AddNewBoardModal } from '../AddNewBoard/AddNewBoardModal';
export const Home = () => {
	const { isTaskViewModalOpen, isAddNewTaskModalOpen, isEditTaskModalOpen } = useAppSelector(state => state.ui);
	return (
		<main className='font-Jakarta min-h-screen bg-LightGrey dark:bg-VeryDarkGrey'>
			<Header />
			<SelectBoardModal />
			<AddNewBoardModal/>
			{isTaskViewModalOpen && <TaskView />}
			{isAddNewTaskModalOpen && <AddNewTaskModal />}
			{isEditTaskModalOpen && <EditTask />}
			<Board />
		</main>
	);
};
