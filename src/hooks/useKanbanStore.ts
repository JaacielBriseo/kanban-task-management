import { useAppSelector } from '../store';
import { findBoardById, findColumnById, findTaskById } from '../helpers';
import axios from 'axios';
import { Column } from '../interfaces';
interface CreateBoardArgs {
	name: string;
	columns: Column[];
	boardId: string;
}
export const useKanbanStore = () => {
	const kanbanState = useAppSelector(state => state.kanbanTask);
	const { uid } = useAppSelector(state => state.auth);
	const activeBoard = findBoardById(kanbanState.boards, kanbanState.selectedBoardId);
	const activeColumn = findColumnById(activeBoard?.columns, kanbanState.selectedColumnId);
	const activeTask = findTaskById(activeColumn, kanbanState.selectedTaskId);
	const startCreatingBoard = async ({ name, columns, boardId }: CreateBoardArgs) => {
		try {
			await axios.post('http://localhost:4000/api/boards/createBoard', { userId: uid, name, columns, boardId });
		} catch (error) {
			console.log(error);
		}
	};
	return {
		...kanbanState,
		activeBoard,
		activeColumn,
		activeTask,
		startCreatingBoard,
	};
};
