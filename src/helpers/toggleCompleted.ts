import { Subtask } from '../interfaces/interfaces';
export const toggleCompleted = (subtask:Subtask) => {
	subtask.isCompleted = !subtask.isCompleted;
};
