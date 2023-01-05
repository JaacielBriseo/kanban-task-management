import { Header, SelectBoardModal } from '../components';
import { useAppSelector } from '../../store';
import { Board, ViewTaskModal } from '../views';
export const Home = () => {
	const { boards } = useAppSelector((state) => state.kanbanTask);
	const boardNames = boards.map((board) => board.name);
	return (
		<main className='font-Jakarta min-h-screen bg-LightGrey dark:bg-VeryDarkGrey'>
			<Header />
			<SelectBoardModal boardNames={boardNames} />
			<Board />
			<ViewTaskModal />
		</main>
	);
};
