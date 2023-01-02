interface TaskProps {
	title: string;
	completedSubtaskCount: number;
	subtaskCount: number;
}

export const Task = ({ title, completedSubtaskCount, subtaskCount }: TaskProps) => (
	<div className='bg-White p-3 rounded-lg m-4 py-5 shadow-lg dark:bg-DarkGrey'>
		<h1 className='font-bold dark:text-White'>{title}</h1>
		<small className='text-MediumGrey'>
			{completedSubtaskCount} of {subtaskCount} subtasks
		</small>
	</div>
);
