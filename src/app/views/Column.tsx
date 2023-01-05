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
				return (
					<Task
						key={task?.title}
						description={task.description}
						status={task.status}
						subtasks={task.subtasks}
						title={task.title}
					/>
				);
			})}
		</div>
	);
};
