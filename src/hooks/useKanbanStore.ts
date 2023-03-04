import {
	createNewBoard,
	createNewTask,
	deleteTask,
	removeBoard,
	setActiveModalName,
	setSelectedBoardId,
	useAppDispatch,
	useAppSelector,
} from '../store';
import { Board, Task } from '../interfaces';
import { boardsApi } from '../api/boardsApi';
import { useKanbanTaskUI } from '.';

export const useKanbanStore = () => {
	const dispatch = useAppDispatch();
	const kanbanState = useAppSelector(state => state.kanbanTask);
	const { activeBoard, activeColumn, activeTask } = useKanbanTaskUI();

	const startCreatingBoard = async (board: Board) => {
		try {
			const { data } = await boardsApi.post('/boards', {
				...board,
			});
			dispatch(createNewBoard(data.board));
			dispatch(setActiveModalName(null));
		} catch (error) {
			// dispatch(setErrorMessage(`Some error :${error}`));
			console.error(error);
		}
	};
	const startCreatingTask = async (task: Task) => {
		if (!activeBoard) {
			console.error('No active board to create task');
			return;
		}
		console.log(activeBoard.columns.find(col => col.columnName === task.status)?.columnId);
		try {
			await boardsApi.post('/tasks', {
				...task,
				parentColumnId: activeBoard.columns.find(col => col.columnName === task.status)?.columnId,
			});
			dispatch(createNewTask({ ...task }));
		} catch (error) {
			// dispatch(setErrorMessage(`Some error :${error}`));
			console.error(error);
		}
	};
	const startDeletingBoard = async () => {
		if (!activeBoard) {
			console.error(`No active board to delete`);
			return;
		}
		try {
			await boardsApi.delete(`/boards/${activeBoard.boardId}`);
			dispatch(removeBoard({ boardIdToDelete: activeBoard.boardId }));
			dispatch(setSelectedBoardId(null));
			dispatch(setActiveModalName(null));
		} catch (error) {
			// dispatch(setErrorMessage(`Some error :${error}`));
			console.error(error);
		}
	};
	const startDeletingTask = async () => {
		if (!activeBoard || !activeColumn || !activeTask) {
			console.error(`No task or col or board`);
			return;
		}
		try {
			await boardsApi.delete(`/${activeBoard.boardId}/${activeColumn.columnId}/${activeTask.taskId}`);
			dispatch(deleteTask({ taskIdToDelete: activeTask.taskId }));
			dispatch(setActiveModalName(null));
		} catch (error) {
			// dispatch(setErrorMessage(`Some error :${error}`));
			console.error(error);
		}
	};
	return {
		//* Properties
		...kanbanState,

		//* Methods
		startCreatingBoard,
		startCreatingTask,
		startDeletingBoard,
		startDeletingTask,
	};
};
