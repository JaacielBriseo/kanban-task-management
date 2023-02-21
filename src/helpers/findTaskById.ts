import { Column } from '../interfaces';

export const findTaskById = (column: Column | undefined, id: string | null) => {
	if (!column || !id) return;
	return column.tasks.find(task => task.taskId === id);
};
