import { NavLink } from 'react-router-dom';
import { useAuthStore, useKanbanStore, useKanbanTaskUI } from '../../hooks';
export const Home = () => {
	const { name } = useAuthStore();
	const { boards } = useKanbanStore();
	const { onSelectBoardId } = useKanbanTaskUI();
	return (
		<section className='flex flex-col flex-1 items-center space-y-4 text-center'>
			<div>
				<h1 className='headingL text-Dark'>Welcome {name}</h1>
				<p className='headingM text-MediumGrey'>
					{boards.length > 0
						? 'Here are your boards'
						: 'You dont have any board, create a new board or access to a team board'}
				</p>
			</div>
			<div className='flex flex-wrap gap-14 justify-center'>
				{boards.map(board => (
					<NavLink
						to={`boards/${board.boardId}`}
						key={board.boardId}
						onClick={() => onSelectBoardId(board.boardId)}
						className='h-40 w-40 rounded-md shadow-md flex items-center justify-center hover:scale-110 duration-300'>
						<span className='headingM'>{board.boardName}</span>
					</NavLink>
				))}
			</div>
		</section>
	);
};
