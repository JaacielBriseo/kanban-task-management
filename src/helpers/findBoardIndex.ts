import { Board } from '../interfaces';

export const findBoardIndex = (boards: Board[], boardId: string): number => {
	return boards.findIndex(board => board.boardId === boardId);
};
