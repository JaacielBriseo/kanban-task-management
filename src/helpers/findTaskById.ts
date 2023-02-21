import { Board } from '../interfaces';

export const findTaskById = (board: Board, columnId: string, taskId: string) => {
	return board.columns.find(column => column.columnId === columnId)?.tasks.find(task => task.taskId === taskId);
};
