import { useAppSelector } from '../../store/rtk-hooks';

export const Board = () => {
	const { boards } = useAppSelector((state) => state.kanbanTask);
	const { activeBoard } = useAppSelector((state) => state.ui);
	const boardToRender = boards.filter((board) => board.name === activeBoard);
	const columns = boardToRender.map((item) => item.columns);
	const todoColumn = columns.map((column) => column.find((column) => column.name === 'Todo'));
	const todoTasks = todoColumn.map((item) => item?.tasks);
	return (
		<section className='px-5'>
			{todoTasks.flat().map((task) => {
				const completedSubtasks = task?.subtasks.filter((subtask) => subtask.isCompleted);
				const completedSubtaskCount = completedSubtasks?.length;
				const subtaskCount = task?.subtasks.length;
				return (
					<div key={task?.title} className='bg-White p-3 rounded-lg m-4'>
						<h1 className='font-bold'>{task?.title}</h1>
						<small>
							{completedSubtaskCount} of {subtaskCount} subtasks
						</small>
					</div>
				);
			})}
		</section>
	);
};
