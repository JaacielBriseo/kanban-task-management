import { Board } from '../interfaces';

export const findBoardById = (boards: Board[], id: string) => {
	return boards.find(board => board.boardId === id)?.name;
};
