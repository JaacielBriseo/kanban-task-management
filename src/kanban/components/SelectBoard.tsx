import { setSelectedBoardId, toggleAddNewBoardModal, toggleSelectBoardModal } from '../../store';
import { useAppDispatch, useAppSelector } from '../../store/rtk-hooks';
import { ThemeToggler } from './ThemeToggler';
export const SelectBoard = () => {
	const { boards } = useAppSelector(state => state.kanbanTask);
	const dispatch = useAppDispatch();
	const handleCreateNewBoardClick = () => {
		dispatch(toggleSelectBoardModal());
		dispatch(toggleAddNewBoardModal());
	};
	return (
		<div className='headingM flex flex-col items-start justify-around h-full p-5'>
			<h1 className='headingS text-MediumGrey'>All boards({boards?.length || 0})</h1>
			{boards &&
				boards.map(board => (
					<button
						className='text-MediumGrey'
						key={board.boardId}
						onClick={() => dispatch(setSelectedBoardId(board.boardId))}>
						{board.name}
					</button>
				))}
			<button onClick={handleCreateNewBoardClick} className='text-MainPurple'>
				+Create New Board
			</button>
			<div className='bg-LightGrey self-center flex space-x-3 px-5 py-2 rounded-lg'>
				<img src='/assets/icon-light-theme.svg' alt='Sun' />
				<ThemeToggler />
				<img src='/assets/icon-dark-theme.svg' alt='Moon' />
			</div>
		</div>
	);
};
