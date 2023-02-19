import { useAppSelector } from '../../store/rtk-hooks';
import { ThemeToggler } from './ThemeToggler';
export const SelectBoard = () => {
	const { boards } = useAppSelector(state => state.kanbanTask);
	return (
		<div className='headingM flex flex-col justify-around h-full p-5'>
			<h1>All boards({boards?.length || 0})</h1>
			{boards && boards.map(board => <button key={board.boardId}>{board.name}</button>)}
			<button>+Create New Board</button>
			<div className='bg-LightGrey flex'>
				<img src='/assets/icon-light-theme.svg' alt='Sun' />
				<ThemeToggler />
				<img src='/assets/icon-dark-theme.svg' alt='Moon' />
			</div>
		</div>
	);
};
