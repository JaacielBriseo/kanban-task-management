import { useAppSelector } from '../../store';
import { Board } from '../components/Board';
import { EmptyBoard } from '../components/EmptyBoard';
import { MobileNavbar } from '../components/MobileNavbar';

export const Home = () => {
	const { boards } = useAppSelector(state => state.kanbanTask);
	return (
		<div>
			<MobileNavbar />
			{boards ? <Board /> : <EmptyBoard />}
		</div>
	);
};
