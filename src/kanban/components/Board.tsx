import { Board as BoardType } from '../../interfaces';
import { setSelectedColumnId, setSelectedTaskId, toggleViewTaskModal, useAppDispatch } from '../../store';

interface Props {
	board: BoardType;
}
export const Board: React.FC<Props> = ({ board }) => {
	const dispatch = useAppDispatch();
	const colors = ['bg-[#49C4E5]', 'bg-[#8471F2]', 'bg-[#67E2AE]'];
	return (
		<div className='flex p-5 space-x-5'>
			{board.columns.map((column, index) => (
				<div key={column.columnId} className='space-y-5'>
					<div className='flex items-center space-x-2'>
						<div className={`h-[15px] w-[15px] rounded-full ${colors[index]}`} />
						<p className='headingS text-MediumGrey uppercase'>
							{column.name}({column.tasks.length})
						</p>
					</div>
					<div className='space-y-5'>
						{column.tasks.map(task => (
							<div
								key={task.taskId}
								onClick={() => {
									dispatch(setSelectedColumnId(column.columnId));
									dispatch(setSelectedTaskId(task.taskId));
									dispatch(toggleViewTaskModal());
								}}
								className='p-5 shadow-md rounded-lg bg-White w-[280px] min-h-[88px]'>
								<h1 className='headingL'>{task.title}</h1>
								<span>
									{task.subtasks.filter(subtask => subtask.isCompleted).length} of {task.subtasks.length}
								</span>
							</div>
						))}
					</div>
				</div>
			))}
			<div className='hidden xl:flex gradiente min-w-[280px] items-center justify-center'>
				<h1 className='headingXL text-MediumGrey'>+New Column</h1>
			</div>
		</div>
	);
};
