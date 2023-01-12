import { useAppSelector, useAppDispatch, openViewTaskModal } from '../../store';
import { ViewTaskModal } from '.';

export const Board = () => {
	const dispatch = useAppDispatch();
	const { boards } = useAppSelector(state => state.kanbanTask);
	const { activeBoard } = useAppSelector(state => state.ui);

	const boardToDisplay = boards.find(board => board.name === activeBoard);

	return (
		<div className='grid grid-cols-1 p-5'>
			{boardToDisplay?.columns.map(column => (
				<div key={column.name} className=''>
					<div className='flex items-center m-3'>
						<span className='w-4 h-4 bg-[#49C4E5] block rounded-full'></span>
						<h1 className='text-MediumGrey font-medium'>&nbsp;{column.name}</h1>
					</div>
					<div id='TaskCard' className='space-y-8'>
						{column.tasks.map(task => {
							const completedTasks = task.subtasks.filter(subtask => subtask.isCompleted).length;
							return (
								<div key={task.title}>
									<div
										onClick={() => dispatch(openViewTaskModal(task))}
										className='flex flex-col justify-center rounded-lg shadow-lg bg-White p-5 h-24'>
										<h2 className='font-bold'>{task.title}</h2>
										<p className='text-MediumGrey font-semibold text-sm'>
											{completedTasks} of {task.subtasks.length} subtasks
										</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			))}
			<ViewTaskModal />
		</div>
	);
};
