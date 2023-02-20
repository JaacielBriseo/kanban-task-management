import { useAppSelector } from '../../store';
import { Board } from '../components/Board';
import { EmptyBoard } from '../components/EmptyBoard';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { ToggleSidebarButton } from '../components/ToggleSidebarButton';

export const Home = () => {
	const { boards } = useAppSelector(state => state.kanbanTask);
	const { isSidebarOpen } = useAppSelector(state => state.ui);
	return (
		<>
			<Navbar />
			<div className='md:grid md:grid-cols-3'>
				{isSidebarOpen && <Sidebar className='md:col-span-1' />}
				<div className={`${isSidebarOpen ? 'md:col-span-2' : 'md:col-span-3'}`}>
					{boards.length ? <Board /> : <EmptyBoard />}
				</div>
			</div>
			<ToggleSidebarButton />
		</>
	);
};
