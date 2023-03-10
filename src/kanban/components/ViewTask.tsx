import { useState } from 'react';
import { useKanbanTaskUI, useKanbanStore } from '../../hooks';

export const ViewTask = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const { activeBoard, activeColumn, activeTask, setActiveModal } = useKanbanTaskUI();
	const { handleToggleSubtask, handleChangeTaskColumnAndStatus } = useKanbanStore();
	if (!activeBoard || !activeColumn || !activeTask) return null;

	return (
		<div className='p-5 flex flex-col space-y-8 w-[343px] min-h-[380px] md:w-[480px] md:h-[429px] md:p-8'>
			<div className='flex justify-between items-center relative'>
				<h1 className='headingL text-Dark w-11/12'>{activeTask.title}</h1>
				<button onClick={() => setIsDropdownOpen(current => !current)}>
					<img src='/assets/icon-vertical-ellipsis.svg' alt='ellipsis' />
				</button>
				<div
					className={`bg-White shadow-lg p-1 z-50 w-[80px] h-[80px] absolute -right-2 -bottom-20 ${
						isDropdownOpen ? 'flex items-center justify-evenly' : 'hidden'
					}`}>
					<button onClick={() => setActiveModal('DeleteTask')} className='p-1'>
						<img src='/assets/icon-delete.svg' alt='delete' />
					</button>
					<button onClick={() => setActiveModal('EditTask')} className='p-1'>
						<img src='/assets/icon-edit.svg' alt='edit' />
					</button>
				</div>
			</div>
			<div>
				<p className='bodyL text-MediumGrey'>{activeTask.description}</p>
			</div>
			<div className='space-y-3'>
				<p className='headingS text-MediumGrey'>
					Subtasks ({activeTask.subtasks.filter(subtask => subtask.isCompleted).length} of {activeTask.subtasks.length})
				</p>
				<div className='space-y-5'>
					{activeTask.subtasks.map(subtask => (
						<label key={subtask.subtaskTitle} className='bg-LightGrey flex justify-between p-2'>
							<input
								type='checkbox'
								checked={subtask.isCompleted}
								onChange={() => handleToggleSubtask(subtask)}
								className='accent-MainPurple'
							/>
							<p className={`headingS w-10/12 ${subtask.isCompleted ? 'line-through text-MediumGrey' : 'text-Dark'}`}>
								{subtask.subtaskTitle}
							</p>
						</label>
					))}
				</div>
			</div>
			<div className='flex flex-col space-y-1'>
				<p className='text-MediumGrey headingS'>Current status ({activeTask.status})</p>
				<select
					name='status'
					className='border py-2'
					onChange={event => {
						if (event.target.value === '') return;
						handleChangeTaskColumnAndStatus(event.target.value);
					}}>
					<option value={activeTask.status}>{activeTask.status}</option>
					{activeBoard.columns
						.filter(column => column.columnName !== activeTask.status)
						.map(column => (
							<option key={column.columnId} value={column.columnName}>
								{column.columnName}
							</option>
						))}
				</select>
			</div>
		</div>
	);
};
