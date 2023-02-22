import { findBoardById, findColumnById, findTaskById } from '../../helpers';
import {
	changeTaskColumnAndStatus,
	toggleDeleteTaskModal,
	toggleSubtaskCompleted,
	toggleViewTaskModal,
	useAppDispatch,
	useAppSelector,
} from '../../store';
import { useState } from 'react';

export const ViewTask = () => {
	const dispatch = useAppDispatch();
	const { kanbanTask } = useAppSelector(state => state);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const { selectedBoardId, selectedColumnId, selectedTaskId, boards } = kanbanTask;
	const selectedBoard = findBoardById(boards, selectedBoardId);
	if (!selectedBoard || !selectedColumnId || !selectedTaskId) return null;
	const column = findColumnById(selectedBoard.columns, selectedColumnId);
	const task = findTaskById(column, selectedTaskId);
	const handleDeleteClick = () => {
		dispatch(toggleViewTaskModal());
		dispatch(toggleDeleteTaskModal());
	};
	return (
		<div className='p-5 flex flex-col space-y-8 w-[343px] min-h-[380px] md:w-[480px] md:h-[429px] md:p-8'>
			<div className='flex justify-between items-center relative'>
				<h1 className='headingL text-Dark w-11/12'>{task?.title}</h1>
				<button onClick={() => setIsDropdownOpen(current => !current)}>
					<img src='/assets/icon-vertical-ellipsis.svg' alt='ellipsis' />
				</button>
				<div
					className={`bg-White shadow-lg p-1 z-50 w-[80px] h-[80px] absolute -right-2 -bottom-20 ${
						isDropdownOpen ? 'flex items-center justify-evenly' : 'hidden'
					}`}>
					<button onClick={handleDeleteClick} className='p-1'>
						<img src='/assets/icon-delete.svg' alt='delete' />
					</button>
					<button className='p-1'>
						<img src='/assets/icon-edit.svg' alt='edit' />
					</button>
				</div>
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
								className='accent-MainPurple'
							/>
							<p className={`headingS w-10/12 ${subtask.isCompleted ? 'line-through text-MediumGrey' : 'text-Dark'}`}>
								{subtask.title}
							</p>
						</label>
					))}
				</div>
			</div>
			<div className='flex flex-col space-y-1'>
				<p className='text-MediumGrey headingS'>Current status ({task?.status})</p>
				<select
					name='status'
					className='border py-2'
					onChange={e => {
						if (e.target.value === '') return;
						dispatch(changeTaskColumnAndStatus({ newStatus: e.target.value }));
					}}>
					<option value=''>Change task status</option>
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
