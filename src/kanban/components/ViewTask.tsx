import { findBoardById, findColumnById, findTaskById } from '../../helpers';
import { changeTaskColumnAndStatus, toggleSubtaskCompleted, useAppDispatch, useAppSelector } from '../../store';

export const ViewTask = () => {
	const dispatch = useAppDispatch();
	const { kanbanTask } = useAppSelector(state => state);
	const { selectedBoardId, selectedColumnId, selectedTaskId, boards } = kanbanTask;
	const selectedBoard = findBoardById(boards, selectedBoardId);
	if (!selectedBoard || !selectedColumnId || !selectedTaskId) return null;
	const column = findColumnById(selectedBoard.columns, selectedColumnId);
	const task = findTaskById(column, selectedTaskId);

	return (
		<div className='p-5 flex flex-col space-y-8 w-[343px] min-h-[380px] md:w-[480px] md:h-[429px] md:p-8'>
			<div>
				<h1 className='headingL text-Dark'>{task?.title}</h1>
			</div>
			<div>
				<p className='bodyL text-MediumGrey'>{task?.description}</p>
			</div>
			<div className='space-y-3'>
				<p className='headingS text-MediumGrey'>
					Subtasks ({task?.subtasks.filter(subtask => subtask.isCompleted).length} of {task?.subtasks.length})
				</p>
				<div className='space-y-5'>
					{task?.subtasks.map(subtask => (
						<label key={subtask.title} className='bg-LightGrey flex justify-between p-2'>
							<input
								type='checkbox'
								checked={subtask.isCompleted}
								onChange={() => {
									dispatch(toggleSubtaskCompleted({ subtaskId: subtask.subtaskId }));
								}}
							/>
							<p className='headingS text-Dark w-10/12'>{subtask.title}</p>
						</label>
					))}
				</div>
			</div>
			<div className='flex flex-col'>
				<p className='text-MediumGrey headingS'>Current status({task?.status})</p>
				<select name='status' onChange={e => dispatch(changeTaskColumnAndStatus({ newStatus: e.target.value }))}>
					{selectedBoard.columns.map(column => (
						<option key={column.columnId} value={column.name}>
							{column.name}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};
