import { useAuthStore, useKanbanStore, useKanbanTaskUI } from '../../hooks';
import { NavLink } from 'react-router-dom';
export const SelectBoard = () => {
	const { boards } = useKanbanStore();
	const { startLogout } = useAuthStore();
	const { setActiveModal, onSelectBoardId } = useKanbanTaskUI();
	return (
		<div className='headingM flex flex-col items-start justify-around h-full p-5'>
			<h1 className='headingS text-MediumGrey'>All boards({boards.length || 0})</h1>
			{boards &&
				boards.map(board => (
					<NavLink
						to={`/boards/${board.boardId}`}
						className='text-MediumGrey'
						key={board.boardId}
						onClick={() => onSelectBoardId(board.boardId)}>
						{board.boardName}
					</NavLink>
				))}
			<button onClick={() => setActiveModal('AddNewBoard')} className='text-MainPurple'>
				+Create New Board
			</button>
			<button type='button' onClick={() => setActiveModal('AddMemberToBoard')} className='text-MainPurple'>
				+Add New Member to Board
			</button>
			<div className='bg-LinesLight w-full px-4 py-1 rounded-md flex items-center justify-center space-x-5'>
				<NavLink to='/profile'>
					<img src='/assets/icon-user.svg' alt='User' className='w-5 h-5' />
				</NavLink>
				<button onClick={() => setActiveModal('AccessToThirdPartyBoard')}>
					<img src='/assets/icon-board.svg' alt='Board' className='w-5 h-5' />
				</button>
				<NavLink to='/user/settings'>
					<img src='/assets/icon-settings.svg' alt='User' className='w-5 h-5' />
				</NavLink>
				<button onClick={startLogout}>
					<img src='/assets/icon-logout.svg' alt='Logout' className='w-5 h-5' />
				</button>
			</div>
			{/* <div className='bg-LightGrey self-center flex space-x-3 px-5 py-2 rounded-lg'>
				<img src='/assets/icon-light-theme.svg' alt='Sun' className='object-contain' />
				<ThemeToggler />
				<img src='/assets/icon-dark-theme.svg' alt='Moon' className='object-contain' />
			</div> */}
		</div>
	);
};
