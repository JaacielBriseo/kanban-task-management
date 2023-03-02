import { findBoardById, findColumnById, findTaskById } from '../helpers';
import {
	AddNewBoard,
	AddNewTask,
	DeleteBoard,
	DeleteTask,
	EditBoard,
	EditTask,
	SelectBoard,
	ViewTask,
} from '../kanban/components';
import {
	setActiveModalName,
	setIsSidebarOpen,
	setSelectedBoardId,
	setSelectedColumnId,
	setSelectedSubtaskId,
	setSelectedTaskId,
	useAppDispatch,
	useAppSelector,
} from '../store';
import { useState, useEffect } from 'react';

export const useUiStore = () => {
	const dispatch = useAppDispatch();
	const {
		activeModalName,
		isSidebarOpen,
		errorMessage,
		isLoading,
		selectedBoardId,
		selectedColumnId,
		selectedSubtaskId,
		selectedTaskId,
	} = useAppSelector(state => state.ui);
	const { boards } = useAppSelector(state => state.kanbanTask);
	const [activeModalContent, setActiveModalContent] = useState<null | JSX.Element>(null);
	const setActiveModal = (modalName: string) => dispatch(setActiveModalName(modalName));
	const closeModal = () => dispatch(setActiveModalName(null));
	const toggleSidebar = () => dispatch(setIsSidebarOpen(!isSidebarOpen));
	const onSelectBoardId = (id: string | null) => dispatch(setSelectedBoardId(id));
	const onSelectColumnId = (id: string | null) => dispatch(setSelectedColumnId(id));
	const onSelectTaskId = (id: string | null) => dispatch(setSelectedTaskId(id));
	const onSelectSubtaskId = (id: string | null) => dispatch(setSelectedSubtaskId(id));

	const activeBoard = findBoardById(boards, selectedBoardId);
	const activeColumn = findColumnById(activeBoard?.columns, selectedColumnId);
	const activeTask = findTaskById(activeColumn, selectedTaskId);

	useEffect(() => {
		switch (activeModalName) {
			case 'AddNewBoard':
				setActiveModalContent(AddNewBoard);
				break;
			case 'AddNewTask':
				setActiveModalContent(AddNewTask);
				break;
			case 'DeleteBoard':
				setActiveModalContent(DeleteBoard);
				break;
			case 'DeleteTask':
				setActiveModalContent(DeleteTask);
				break;
			case 'EditBoard':
				setActiveModalContent(EditBoard);
				break;
			case 'EditTask':
				setActiveModalContent(EditTask);
				break;
			case 'SelectBoard':
				setActiveModalContent(SelectBoard);
				break;
			case 'ViewTask':
				setActiveModalContent(ViewTask);
				break;

			default:
				setActiveModalContent(null);
				break;
		}
	}, [activeModalName]);

	return {
		//* Properties
		activeModalContent,
		activeModalName,
		activeBoard,
		activeColumn,
		activeTask,
		errorMessage,
		isLoading,
		isSidebarOpen,
		selectedBoardId,
		selectedColumnId,
		selectedSubtaskId,
		selectedTaskId,

		//* Methods
		closeModal,
		toggleSidebar,
		setActiveModal,
		onSelectBoardId,
		onSelectColumnId,
		onSelectTaskId,
		onSelectSubtaskId,
	};
};
