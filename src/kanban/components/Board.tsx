import { useKanbanTaskUI } from '../../hooks';

export const Board: React.FC = () => {
	const colors = ['bg-[#49C4E5]', 'bg-[#8471F2]', 'bg-[#67E2AE]'];
	const { onSelectColumnId, onSelectTaskId, setActiveModal, activeBoard } = useKanbanTaskUI();

	return (
		<div className='flex space-x-5 w-max'>
			{activeBoard?.columns.map((column, index) => (
				<div key={column.columnId} className='space-y-5'>
					<div className='flex items-center space-x-2 w-[280px]'>
						<div className={`h-[15px] w-[15px] rounded-full ${colors[index]}`} />
						<p className='headingS text-MediumGrey uppercase'>
							{column.columnName}({column.tasks.length})
						</p>
					</div>
					<div className='space-y-5'>
						{column.tasks.map(task => (
							<div
								key={task.taskId}
								onClick={() => {
									setActiveModal('ViewTask');
									onSelectColumnId(column.columnId);
									onSelectTaskId(task.taskId);
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
			<div className='flex gradiente items-center justify-center min-w-[280px] w-full min-h-[calc(100vh-120px)]'>
				<h1 className='headingXL text-MediumGrey'>+New Column</h1>
			</div>
		</div>
	);
};

export default Board;
