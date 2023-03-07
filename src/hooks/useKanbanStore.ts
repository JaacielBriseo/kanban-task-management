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
import { Board, Subtask, Task, User } from '../interfaces';
import { boardsApi } from '../api/boardsApi';
import { useKanbanTaskUI } from '.';
import { findParentColumnId } from '../helpers/findParentColumnId';

export const useKanbanStore = () => {
	const dispatch = useAppDispatch();
	const kanbanState = useAppSelector(state => state.kanbanTask);
	const { activeBoard, activeColumn, activeTask } = useKanbanTaskUI();

	//! Handle if task should be moved to another column.
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

	//! Handle toggling subtask isCompleted
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

	//! Create a new board and retrieve the response from the backend to update the state.
	const startCreatingBoard = async (board: Board) => {
		try {
			const response = await boardsApi.post<{ board: Board }>('/boards', {
				...board,
			});
			console.log(response);
			dispatch(createNewBoard(response.data.board));
			dispatch(setActiveModalName(null));
		} catch (error) {
			// dispatch(setErrorMessage(`Some error :${error}`));
			console.error(error);
		}
	};

	//! Create a new task and retrieve the response from the backend to update the state.
	const startCreatingTask = async (task: Task) => {
		if (!activeBoard) {
			console.error('No active board to create task');
			return;
		}
		try {
			const { data } = await boardsApi.post<{ task: Task }>('/tasks', {
				...task,
			});
			dispatch(createNewTask({ ...data.task }));
			dispatch(setActiveModalName(null));
		} catch (error) {
			// dispatch(setErrorMessage(`Some error :${error}`));
			console.error(error);
		}
	};
	//! Remove a Board.
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

	//! Remove a Task.
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

	//! Edit a board and retrieve the response from backend to update state.
	const startEditingBoard = async (updatedBoardData: Board) => {
		if (!activeBoard) {
			console.error('No active board to edit.');
			return;
		}
		try {
			const { data } = await boardsApi.put<{ updatedBoard: Board }>(`/boards/${activeBoard.boardId}`, {
				updatedBoardData,
			});
			dispatch(updateBoard(data.updatedBoard));
			dispatch(setActiveModalName(null));
		} catch (error) {
			// dispatch(setErrorMessage(`Some error :${error}`));
			console.error(error);
		}
	};

	//! Edit a task and retrieve the response from backend to update state.
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
			const { data } = await boardsApi.put<{ updatedTask: Task }>(`/tasks/${activeTask.taskId}`, { updatedTaskData });
			dispatch(updateTask(data.updatedTask));
			closeModal && dispatch(setActiveModalName(null));
		} catch (error) {
			// dispatch(setErrorMessage(`Some error :${error}`));
			console.error(error);
		}
	};

	//! Add a new member to a specific board.
	const startAddingNewMember = async (newMemberData: Pick<User, 'email' | 'name'>) => {
		const { email, name } = newMemberData;
		if (!activeBoard) {
			console.log('A board must be active in order to add new member.');
			return;
		}
		try {
			const { data } = await boardsApi.post<{ board: Board }>(`/boards/${activeBoard?.boardId}/members`, {
				email,
				name,
			});
			dispatch(updateBoard(data.board));
			dispatch(setActiveModalName(null));
		} catch (error) {
			// dispatch(setErrorMessage(`Some error :${error}`));
			console.error(error);
		}
	};

	return {
		//* Properties
		...kanbanState,

		//* Methods for boards.
		startCreatingBoard,
		startCreatingTask,
		startDeletingBoard,
		startDeletingTask,
		startEditingBoard,
		startEditingTask,
		handleToggleSubtask,
		handleChangeTaskColumnAndStatus,

		//* Methods to handle members of board.
		startAddingNewMember,
	};
};
