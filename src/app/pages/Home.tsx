import { Header, SelectBoardModal } from '../components';
import { useAppSelector } from '../../store';
import { Board } from '../views';
export const Home = () => {
	const { boards } = useAppSelector((state) => state.kanbanTask);
	const boardNames = boards.map((board) => board.name);
	return (
		<main className='font-Jakarta bg-LightGrey'>
			<Header />
			<SelectBoardModal boardNames={boardNames} />
			<Board />
		</main>
	);
};
