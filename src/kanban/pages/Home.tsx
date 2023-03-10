import { useKanbanTaskUI } from '../../hooks';
import { Board, EmptyBoard } from '../components';
export const Home = () => {
	const { activeBoard } = useKanbanTaskUI();
	return (
		<>
			{!activeBoard ? (
				<h1 className=''>
					Select a board to display
				</h1>
			) : activeBoard.columns.length ? (
				<Board/>
			) : (
				<EmptyBoard />
			)}
		</>
	);
};
