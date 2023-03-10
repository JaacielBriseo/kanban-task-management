import {
	addThirdPartyBoard,
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
import { useNavigate } from 'react-router-dom';

export const useKanbanStore = () => {
	const dispatch = useAppDispatch();
	const kanbanState = useAppSelector(state => state.kanbanTask);
	const { activeBoard, activeColumn, activeTask, onSavingChanges, onSelectBoardId } = useKanbanTaskUI();
	const navigate = useNavigate();
	
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
		dispatch(setActiveModalName('SavingChanges'));
		onSavingChanges('loading');
		try {
			const response = await boardsApi.post<{ board: Board }>('/boards', {
				...board,
			});
			console.log(response);
			dispatch(createNewBoard(response.data.board));
			onSavingChanges('successful');
			onSelectBoardId(response.data.board.boardId);
			navigate(`/boards/${response.data.board.boardId}`);
		} catch (error) {
			// dispatch(setErrorMessage(`Some error :${error}`));
			console.error(error);
			onSavingChanges('error');
		}
	};

	//! Create a new task and retrieve the response from the backend to update the state.
	const startCreatingTask = async (task: Task) => {
		if (!activeBoard) {
			console.error('No active board to create task');
			return;
		}
		dispatch(setActiveModalName('SavingChanges'));
		onSavingChanges('loading');
		try {
			const { data } = await boardsApi.post<{ task: Task }>('/tasks', {
				...task,
			});
			dispatch(createNewTask({ ...data.task }));
			onSavingChanges('successful');
		} catch (error) {
			// dispatch(setErrorMessage(`Some error :${error}`));
			console.error(error);
			onSavingChanges('error');
		}
	};
	//! Remove a Board.
	const startDeletingBoard = async () => {
		if (!activeBoard) {
			console.error(`No active board to delete`);
			return;
		}
		dispatch(setActiveModalName('SavingChanges'));
		onSavingChanges('loading');
		try {
			await boardsApi.delete(`/boards/${activeBoard.boardId}`);
			dispatch(removeBoard({ boardIdToDelete: activeBoard.boardId }));
			dispatch(setSelectedBoardId(null));
			onSavingChanges('successful');
			navigate('/');
		} catch (error) {
			// dispatch(setErrorMessage(`Some error :${error}`));
			console.error(error);
			onSavingChanges('error');
		}
	};

	//! Remove a Task.
	const startDeletingTask = async () => {
		if (!activeBoard || !activeColumn || !activeTask) {
			console.error(`No task or col or board`);
			return;
		}
		dispatch(setActiveModalName('SavingChanges'));
		onSavingChanges('loading');
		try {
			await boardsApi.delete(`/tasks/${activeTask.taskId}`);
			dispatch(deleteTask({ taskIdToDelete: activeTask.taskId }));
			onSavingChanges('successful');
		} catch (error) {
			// dispatch(setErrorMessage(`Some error :${error}`));
			console.error(error);
			onSavingChanges('error');
		}
	};

	//! Edit a board and retrieve the response from backend to update state.
	const startEditingBoard = async (updatedBoardData: Board) => {
		if (!activeBoard) {
			console.error('No active board to edit.');
			return;
		}
		dispatch(setActiveModalName('SavingChanges'));
		onSavingChanges('loading');
		try {
			const { data } = await boardsApi.put<{ updatedBoard: Board }>(`/boards/${activeBoard.boardId}`, {
				updatedBoardData,
			});
			dispatch(updateBoard(data.updatedBoard));
			onSavingChanges('successful');
		} catch (error) {
			// dispatch(setErrorMessage(`Some error :${error}`));
			console.error(error);
			onSavingChanges('error');
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
		dispatch(setActiveModalName('SavingChanges'));
		onSavingChanges('loading');
		try {
			const { data } = await boardsApi.post<{ board: Board }>(`/boards/${activeBoard?.boardId}/members`, {
				email,
				name,
			});
			dispatch(updateBoard(data.board));
			onSavingChanges('successful');
		} catch (error) {
			// dispatch(setErrorMessage(`Some error :${error}`));
			console.error(error);
			onSavingChanges('error');
		}
	};

	//! Navigate to a board by ID
	const startNavigateToThirdPartyBoard = async (thirdPartyBoardId: string) => {
		onSavingChanges('loading');
		try {
			const response = await boardsApi.get<{ board: Board }>(`/boards/${thirdPartyBoardId}`);
			dispatch(addThirdPartyBoard(response.data.board));
			navigate(`/boards/${response.data.board.boardId}`);
			dispatch(setSelectedBoardId(response.data.board.boardId));
			onSavingChanges('successful');
		} catch (error) {
			// dispatch(setErrorMessage(`Some error :${error}`));
			console.error(error);
			onSavingChanges('error');
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
		startNavigateToThirdPartyBoard,
	};
};
