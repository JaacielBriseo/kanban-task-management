import {
	createNewBoard,
	createNewTask,
	deleteTask,
	removeBoard,
	setErrorMessage,
	setSelectedBoardId,
	toggleDeleteBoardModal,
	toggleDeleteTaskModal,
	useAppDispatch,
	useAppSelector,
} from '../store';
import { findBoardById, findColumnById, findTaskById } from '../helpers';
import { Board, Task } from '../interfaces';
import { boardsApi } from '../api/boardsApi';

export const useKanbanStore = () => {
	const dispatch = useAppDispatch();
	const { uid } = useAppSelector(state => state.auth);
	const kanbanState = useAppSelector(state => state.kanbanTask);
	const activeBoard = findBoardById(kanbanState.boards, kanbanState.selectedBoardId);
	const activeColumn = findColumnById(activeBoard?.columns, kanbanState.selectedColumnId);
	const activeTask = findTaskById(activeColumn, kanbanState.selectedTaskId);
	const startCreatingBoard = async (board: Board) => {
		try {
			await boardsApi.post('/createBoard', {
				userId: uid,
				...board,
			});
			dispatch(createNewBoard({ ...board }));
		} catch (error) {
			dispatch(setErrorMessage(`Some error :${error}`));
			console.error(error);
		}
	};
	const startCreatingTask = async (task: Task) => {
		if (!activeBoard) {
			console.error('No active board to create task');
			return;
		}
		try {
			await boardsApi.post('/createTask', {
				...task,
				userId: uid,
				columnId: activeBoard.columns.find(col => col.name === task.status)?.columnId,
				boardId: activeBoard.boardId,
			});
			dispatch(createNewTask({ ...task }));
		} catch (error) {
			dispatch(setErrorMessage(`Some error :${error}`));
			console.error(error);
		}
	};
	const startDeletingBoard = async () => {
		if (!activeBoard) {
			console.error(`No active board to delete`);
			return;
		}
		try {
			await boardsApi.delete(`/${uid}/${activeBoard.boardId}`, {
				params: {
					boardId: activeBoard.boardId,
				},
			});
			dispatch(removeBoard({ boardIdToDelete: activeBoard.boardId }));
			dispatch(toggleDeleteBoardModal());
			dispatch(setSelectedBoardId(null));
		} catch (error) {
			dispatch(setErrorMessage(`Some error :${error}`));
			console.error(error);
		}
	};
	const startDeletingTask = async () => {
		if (!activeBoard || !activeColumn || !activeTask) {
			console.error(`No task or col or board`);
			return;
		}
		try {
			await boardsApi.delete(`/${uid}/${activeBoard.boardId}/${activeColumn.columnId}/${activeTask.taskId}`);
			dispatch(deleteTask({ taskIdToDelete: activeTask.taskId }));
			dispatch(toggleDeleteTaskModal());
		} catch (error) {
			dispatch(setErrorMessage(`Some error :${error}`));
			console.error(error);
		}
	};
	return {
		...kanbanState,
		activeBoard,
		activeColumn,
		activeTask,
		startCreatingBoard,
		startCreatingTask,
		startDeletingBoard,
		startDeletingTask,
	};
};
