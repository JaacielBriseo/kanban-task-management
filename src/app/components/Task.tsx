import { Task as TaskProps } from '../../interfaces';
import { setActiveViewTask, useAppDispatch } from '../../store';

export const Task = ({ description, status, subtasks, title }: TaskProps) => {
	const dispatch = useAppDispatch();
	const completedSubtasks = subtasks.filter((subtask) => subtask.isCompleted);
	const completedSubtaskCount = completedSubtasks?.length;
	const subtaskCount = subtasks.length;
	return (
		<div
			onClick={() => dispatch(setActiveViewTask({ description, status, subtasks, title }))}
			className='bg-White p-3 rounded-lg m-4 py-5 shadow-lg dark:bg-DarkGrey'
		>
			<h1 className='font-bold dark:text-White'>{title}</h1>
			<small className='text-MediumGrey'>
				{completedSubtaskCount} of {subtaskCount} subtasks
			</small>
		</div>
	);
};
