import { Board } from '../interfaces';

export const findBoardById = (boards: Board[], id: string | null) => {
	if (!id) return;
	return boards.find(board => board.boardId === id);
};
