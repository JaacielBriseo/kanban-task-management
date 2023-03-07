import { useAppSelector } from '../../store';
import { Board } from '../components';

export const ThirdPartyBoard = () => {
	const { board } = useAppSelector(state => state.thirdPartyBoard);
	if (!board) {
		console.log('No board found');
		return;
	}
	return (
		<div>
			Third party board
			<Board board={board} />
		</div>
	);
};
