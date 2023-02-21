import { findTaskById } from '../../helpers/findTaskById';
import { useAppSelector } from '../../store/rtk-hooks';
import { findBoardById } from '../../helpers/findBoardById';

export const ViewTask = () => {
	const { kanbanTask } = useAppSelector(state => state);
	const { selectedBoardId, selectedColumnId, selectedTaskId, boards } = kanbanTask;
	const selectedBoard = findBoardById(boards, selectedBoardId);
	if (!selectedBoard || !selectedColumnId || !selectedTaskId) return null;
	const task = findTaskById(selectedBoard, selectedColumnId, selectedTaskId);
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
					Subtasks ({task?.subtasks.filter(subtask => subtask.isCompleted).length}of{task?.subtasks.length})
				</p>
				<div className='space-y-5'>
					{task?.subtasks.map(subtask => (
						<label key={subtask.title} className='bg-LightGrey flex justify-between p-2'>
							<input type='checkbox' name='' id='' />
							<p className='headingS text-Dark w-10/12'>{subtask.title}</p>
						</label>
					))}
				</div>
			</div>
			<div className='flex flex-col'>
				<p className='text-MediumGrey headingS'>Current status({task?.status})</p>
				<select name='status'>
					<option value={task?.status}></option>
					<option value='Todo'>Todo</option>
					<option value='Doing'>Doing</option>
					<option value='Done'>Done</option>
				</select>
			</div>
		</div>
	);
};
