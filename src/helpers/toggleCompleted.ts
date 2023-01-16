import { Subtask } from '../interfaces';
export const toggleCompleted = (subtask:Subtask) => {
	subtask.isCompleted = !subtask.isCompleted;
};
