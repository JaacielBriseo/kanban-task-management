import { Task } from '../interfaces';

export const findTaskIndex = (tasks: Task[], taskId: string): number => {
	return tasks.findIndex(task => task.taskId === taskId);
};
