import {
	changeTaskColumnAndStatus,
	createNewBoard,
	createNewTask,
	deleteTask,
	removeBoard,
	setActiveModalName,
	setSelectedBoardId,
	toggleSubtaskCompleted,
	updateBoard,
	updateTask,
	useAppDispatch,
	useAppSelector,
} from '../store';
import { Board, Subtask, Task } from '../interfaces';
import { boardsApi } from '../api/boardsApi';
import { useKanbanTaskUI } from '.';
import { useRef } from 'react';
import { findParentColumnId } from '../helpers/findParentColumnId';

export const useKanbanStore = () => {
	const dispatch = useAppDispatch();
	const debounceRef = useRef<NodeJS.Timeout>();
	const kanbanState = useAppSelector(state => state.kanbanTask);
	const { activeBoard, activeColumn, activeTask } = useKanbanTaskUI();

	const handleChangeTaskColumnAndStatus = (status: string) => {
		if (!activeTask || !activeBoard) return;
		const updatedTask: Task = {
			...activeTask,
			parentColumnId: findParentColumnId(activeBoard.columns, status)!,
			status,
		};
		dispatch(changeTaskColumnAndStatus({ newStatus: status }));
		if (debounceRef.current) clearTimeout(debounceRef.current);
		debounceRef.current = setTimeout(() => {
			startEditingTask({
				closeModal: false,
				updatedTaskData: updatedTask,
			});
		}, 1800);
	};
	const handleToggleSubtask = (subtask: Subtask) => {
		if (!activeTask) return;
		const updatedTask: Task = {
			...activeTask,
			subtasks: activeTask.subtasks.map(activeSubtask => {
				return activeSubtask.subtaskId === subtask.subtaskId
					? { ...activeSubtask, isCompleted: !activeSubtask.isCompleted }
					: activeSubtask;
			}),
		};
		dispatch(toggleSubtaskCompleted({ subtaskId: subtask.subtaskId }));
		if (debounceRef.current) clearTimeout(debounceRef.current);
		debounceRef.current = setTimeout(() => {
			startEditingTask({ updatedTaskData: updatedTask, closeModal: false });
		}, 1000);
	};

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
		try {
			await boardsApi.post('/tasks', {
				...task,
			});
			dispatch(createNewTask({ ...task }));
			dispatch(setActiveModalName(null));
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
			await boardsApi.delete(`/tasks/${activeTask.taskId}`);
			dispatch(deleteTask({ taskIdToDelete: activeTask.taskId }));
			dispatch(setActiveModalName(null));
		} catch (error) {
			// dispatch(setErrorMessage(`Some error :${error}`));
			console.error(error);
		}
	};
	const startEditingBoard = async (updatedBoardData: Board) => {
		if (!activeBoard) {
			console.error('No active board to edit.');
			return;
		}
		try {
			await boardsApi.put(`/boards/${activeBoard.boardId}`, { updatedBoardData });
			dispatch(updateBoard(updatedBoardData));
			dispatch(setActiveModalName(null));
		} catch (error) {
			// dispatch(setErrorMessage(`Some error :${error}`));
			console.error(error);
		}
	};
	const startEditingTask = async ({
		updatedTaskData,
		closeModal = true,
	}: {
		updatedTaskData: Task;
		closeModal?: boolean;
	}) => {
		if (!activeBoard || !activeTask) {
			console.error('No active board and/or task to edit.');
			return;
		}
		try {
			await boardsApi.put(`/tasks/${activeTask.taskId}`, { updatedTaskData });
			dispatch(updateTask(updatedTaskData));
			closeModal && dispatch(setActiveModalName(null));
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
		startEditingBoard,
		startEditingTask,

		handleToggleSubtask,
		handleChangeTaskColumnAndStatus,
	};
};
