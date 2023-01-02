import { Column } from '.';
import { useBoardColumns } from '../../hooks';

export const Board = () => {
	const { doingTasks, doneTasks, todoTasks } = useBoardColumns();
	return (
		<section className='px-5'>
			<Column columnTasks={todoTasks} title='Todo' />
			<Column columnTasks={doingTasks} title='Doing' />
			<Column columnTasks={doneTasks} title='Done' />
		</section>
	);
};
