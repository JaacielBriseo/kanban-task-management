import { Board, Header } from '../components';
import { SelectBoardModal } from '../../ui';
export const Home = () => {

	return (
		<main className='font-Jakarta min-h-screen bg-LightGrey dark:bg-VeryDarkGrey'>
			<Header />
			<SelectBoardModal />
			<Board />
		</main>
	);
};
