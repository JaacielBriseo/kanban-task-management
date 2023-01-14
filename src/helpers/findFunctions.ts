import { Board, Column, Task } from '../interfaces';

export const findBoard = (boards: Board[], activeBoard: string): Board | undefined => {
	return boards.find(board => board.name === activeBoard);
};
export const findNewColumn = (board: Board, status: string) => {
	return board.columns.find(col => col.name === status);
};

export const findTask = (board: Board, taskId: number): Task | undefined => {
	return board.columns
		.map(col => col.tasks)
		.flat()
		.find(task => task.taskId === taskId);
};

export const findColumn = (board: Board, taskId: number): Column | undefined => {
	return board.columns.find(col => col.tasks.find(t => t.taskId === taskId));
};
export const findColumnByName = (board: Board, name: string): Column | undefined => {
	return board.columns.find(col => col.name === name);
};
export const getTaskId = (board: Board): Task[] => {
	return board.columns.map(col => col.tasks).flat();
};
