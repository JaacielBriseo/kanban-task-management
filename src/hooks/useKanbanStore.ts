import axios from 'axios';
import { createNewBoard, createNewTask, setErrorMessage, useAppDispatch, useAppSelector } from '../store';
import { findBoardById, findColumnById, findTaskById } from '../helpers';
import { Board, Task } from '../interfaces';

export const useKanbanStore = () => {
	const dispatch = useAppDispatch();
	const { uid } = useAppSelector(state => state.auth);
	const kanbanState = useAppSelector(state => state.kanbanTask);
	const activeBoard = findBoardById(kanbanState.boards, kanbanState.selectedBoardId);
	const activeColumn = findColumnById(activeBoard?.columns, kanbanState.selectedColumnId);
	const activeTask = findTaskById(activeColumn, kanbanState.selectedTaskId);
	const startCreatingBoard = async (board: Board) => {
		await axios
			.post('http://localhost:4000/api/boards/createBoard', {
				userId: uid,
				...board,
			})
			.then(() => {
				dispatch(createNewBoard({ ...board }));
			})
			.catch(error => {
				dispatch(setErrorMessage(`Some error :${error}`));
				console.error(error);
			});
	};
	const startCreatingTask = async (task: Task) => {
		if (!activeBoard) {
			console.error('No active board to create task');
			return;
		}
		await axios
			.post('http://localhost:4000/api/boards/createTask', {
				...task,
				userId: uid,
				columnId: activeBoard.columns.find(col => col.name === task.status)?.columnId,
				boardId: activeBoard.boardId,
			})
			.then(() => {
				dispatch(createNewTask({ ...task }));
			})
			.catch(error => {
				dispatch(setErrorMessage(`Some error :${error}`));
				console.error(error);
			});
	};
	return {
		...kanbanState,
		activeBoard,
		activeColumn,
		activeTask,
		startCreatingBoard,
		startCreatingTask,
	};
};
