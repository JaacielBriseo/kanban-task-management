import { useKanbanStore, useKanbanTaskUI } from '../../hooks';
import { ThemeToggler } from '.';
import { NavLink } from 'react-router-dom';
export const SelectBoard = () => {
	const { boards } = useKanbanStore();
	const { setActiveModal, onSelectBoardId } = useKanbanTaskUI();
	return (
		<div className='headingM flex flex-col items-start justify-around h-full p-5'>
			<h1 className='headingS text-MediumGrey'>All boards({boards.length || 0})</h1>
			{boards &&
				boards.map(board => (
					<button className='text-MediumGrey' key={board.boardId} onClick={() => onSelectBoardId(board.boardId)}>
						{board.boardName}
					</button>
				))}
			<button onClick={() => setActiveModal('AddNewBoard')} className='text-MainPurple'>
				+Create New Board
			</button>
			<button type='button' onClick={() => setActiveModal('AddMemberToBoard')} className='text-MainPurple'>
				+Add New Member to Board
			</button>
			<div className='bg-LinesLight w-full'>
				<NavLink to='/profile'>Profile</NavLink>
			</div>
			<div className='bg-LightGrey self-center flex space-x-3 px-5 py-2 rounded-lg'>
				<img src='/assets/icon-light-theme.svg' alt='Sun' className='object-contain' />
				<ThemeToggler />
				<img src='/assets/icon-dark-theme.svg' alt='Moon' className='object-contain' />
			</div>
		</div>
	);
};
