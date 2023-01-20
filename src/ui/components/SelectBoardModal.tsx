import { useAppSelector, useAppDispatch, setSelectedBoardId, toggleAddNewBoardModal } from '../../store';
import { ThemeToggler } from './ThemeToggler';

export const SelectBoardModal = () => {
	const { isSelectModalOpen } = useAppSelector(state => state.ui);
	const { boards } = useAppSelector(state => state.kanbanTask);
	const dispatch = useAppDispatch();
	return (
		<div className={`${isSelectModalOpen ? 'fixed' : 'hidden'} w-full h-screen bg-black bg-opacity-75 z-10`}>
			<div className={`w-[264px] h-[322px] mt-20 mx-auto p-3 rounded-lg shadow-lg bg-White dark:bg-DarkGrey`}>
				<ul>
					<h2 className='font-bold text-sm text-DarkGrey dark:text-LightGrey'>All boards ({boards.length})</h2>
					{boards.map(board => (
						<div key={board.name}>
							<li className='hover:bg-blue-700 p-3'>
								<div className='flex items-center space-x-4 text-MediumGrey hover:text-White'>
									<img src='./assets/icon-board.svg' alt='board' />
									<button
										onClick={() => dispatch(setSelectedBoardId(board.boardId))}
										type='button'
										className='font-semibold'>
										{board.name}
									</button>
								</div>
							</li>
						</div>
					))}
					<button
						type='button'
						className='text-MainPurple font-bold'
						onClick={() => dispatch(toggleAddNewBoardModal())}>
						+ Create New Board
					</button>
				</ul>
				<ThemeToggler />
			</div>
		</div>
	);
};
