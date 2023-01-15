import { SelectBoardModal, Header } from '../../ui';
import { Board } from '../Board';
export const Home = () => {
	return (
		<main className='font-Jakarta min-h-screen bg-LightGrey dark:bg-VeryDarkGrey'>
			<Header />
			<SelectBoardModal />
			<Board />
		</main>
	);
};
