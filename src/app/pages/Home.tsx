import { SelectBoardModal, Header } from '../../ui';
import { Board } from '../Board';
import { TaskView } from '../TaskView';
export const Home = () => {
	return (
		<main className='font-Jakarta min-h-screen bg-LightGrey dark:bg-VeryDarkGrey'>
			<Header />
			<TaskView />
			<SelectBoardModal />
			<Board />
		</main>
	);
};
