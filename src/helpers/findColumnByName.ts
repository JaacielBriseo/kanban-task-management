import { Board } from '../interfaces';

export const findColumnByName = (board: Board, name: string) => {
	return board.columns.findIndex(col => col.name === name);
};
