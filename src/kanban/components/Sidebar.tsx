import { useKanbanStore, useKanbanTaskUI } from '../../hooks';
import { ThemeToggler } from './ThemeToggler';
interface Props {
	className?: string;
}
export const Sidebar: React.FC<Props> = ({ className }) => {
	const { boards } = useKanbanStore();
	const { toggleSidebar, setActiveModal, onSelectBoardId } = useKanbanTaskUI();

	return (
		<div className={`hidden md:block w-[240px] h-[calc(100vh-90px)] p-5 bg-White ${className}`}>
			<div className='flex flex-col justify-between h-full'>
				<div className='space-y-3'>
					<h1 className='text-MediumGrey headingS'>All boards({boards.length || 0})</h1>
					{boards.length
						? boards.map(board => (
								<div key={board.boardId}>
									<div onClick={() => onSelectBoardId(board.boardId)} className='flex space-x-3 cursor-pointer'>
										<img src='/assets/icon-board-purple.svg' alt='board' />
										<p className='text-MediumGrey headingM'>{board.boardName}</p>
									</div>
								</div>
						  ))
						: null}
					<div className='flex space-x-2'>
						<img src='/assets/icon-board-purple.svg' alt='board' />
						<button onClick={() => setActiveModal('AddNewBoard')} className='text-MainPurple'>
							+Create New Board
						</button>
					</div>
				</div>
				<div className='space-y-5'>
					<div className='flex items-center justify-center px-2 py-3 space-x-3 rounded-md bg-LightGrey'>
						<img src='/assets/icon-light-theme.svg' alt='light' className='w-[18px] h-[18px]' />
						<ThemeToggler />
						<img src='/assets/icon-dark-theme.svg' alt='dark-theme' className='w-[18px] h-[18px]' />
					</div>
					<button onClick={toggleSidebar} className='flex items-center space-x-3'>
						<img src='/assets/icon-hide-sidebar.svg' alt='hide' />
						<span className='headingM text-MediumGrey'>Hide sidebar</span>
					</button>
				</div>
			</div>
		</div>
	);
};
