import { useAppSelector } from '../store';
import { findBoardById, findColumnById, findTaskById } from '../helpers';

export const useKanbanStore = () => {
	const kanbanState = useAppSelector(state => state.kanbanTask);
	const activeBoard = findBoardById(kanbanState.boards, kanbanState.selectedBoardId);
	const activeColumn = findColumnById(activeBoard?.columns, kanbanState.selectedColumnId);
	const activeTask = findTaskById(activeColumn, kanbanState.selectedTaskId);
	return {
		...kanbanState,
		activeBoard,
		activeColumn,
		activeTask,
	};
};
