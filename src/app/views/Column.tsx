import { Task as TaskProps } from '../../interfaces';
import { Task } from '../components';
interface ColumnProps {
	columnTasks: TaskProps[] | undefined;
	title: string;
}
export const Column = ({ columnTasks, title }: ColumnProps) => {
	return (
		<div className='p-3'>
			<h1 className='flex items-center space-x-2'>
				<span className='w-4 h-4 bg-[#49C4E5] block rounded-full'></span>
				<p className='text-MediumGrey font-semibold'>
					{title} ({columnTasks?.length})
				</p>
			</h1>
			{columnTasks?.flatMap((task) => {
				const completedSubtasks = task?.subtasks.filter((subtask) => subtask.isCompleted);
				const completedSubtaskCount = completedSubtasks?.length;
				const subtaskCount = task?.subtasks.length;
				return (
					<Task
						key={task?.title}
						title={task?.title}
						completedSubtaskCount={completedSubtaskCount}
						subtaskCount={subtaskCount}
					/>
				);
			})}
		</div>
	);
};
