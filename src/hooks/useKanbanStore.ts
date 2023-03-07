import {
	createNewBoard,
	createNewTask,
	deleteTask,
	removeBoard,
	setActiveModalName,
	setSelectedBoardId,
	updateBoard,
	updateTask,
	useAppDispatch,
	useAppSelector,
} from '../store';
import { Board, Subtask, Task } from '../interfaces';
import { boardsApi } from '../api/boardsApi';
import { useKanbanTaskUI } from '.';
import { findParentColumnId } from '../helpers/findParentColumnId';

export const useKanbanStore = () => {
	const dispatch = useAppDispatch();
	const kanbanState = useAppSelector(state => state.kanbanTask);
	const { activeBoard, activeColumn, activeTask } = useKanbanTaskUI();

	const handleChangeTaskColumnAndStatus = async (status: string) => {
		if (!activeTask || !activeBoard) return;
		const updatedTaskData: Task = {
			...activeTask,
			parentColumnId: findParentColumnId(activeBoard.columns, status)!,
			status,
		};
		try {
			await startEditingTask({
				closeModal: false,
				updatedTaskData,
			});
		} catch (error) {
			console.log(error);
		}
	};
	const handleToggleSubtask = async (subtask: Subtask) => {
		if (!activeTask) return;
		const updatedTaskData: Task = {
			...activeTask,
			subtasks: activeTask.subtasks.map(activeSubtask => {
				return activeSubtask.subtaskId === subtask.subtaskId
					? { ...activeSubtask, isCompleted: !activeSubtask.isCompleted }
					: activeSubtask;
			}),
		};
		try {
			await startEditingTask({ updatedTaskData, closeModal: false });
		} catch (error) {
			console.log(error);
		}
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
			const { data } = await boardsApi.post('/tasks', {
				...task,
			});
			dispatch(createNewTask({ ...data.task }));
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
			const { data } = await boardsApi.put(`/tasks/${activeTask.taskId}`, { updatedTaskData });
			dispatch(updateTask(data.updatedTask));
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
