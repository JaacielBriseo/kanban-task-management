import { useAppSelector } from '../../store';
import { Board } from '../components';

export const ThirdPartyBoard = () => {
	const { board } = useAppSelector(state => state.thirdPartyBoard);
	if (!board) {
		console.log('No board found');
		return <h1>404 NOT FOUND!</h1>;
	}
	return (
		<div>
			<h1 className='headingL text-center'>{board.boardName}</h1>
			<Board board={board} />
		</div>
	);
};
