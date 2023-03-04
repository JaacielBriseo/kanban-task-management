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
import { findBoardById, findColumnById, findTaskById } from '../helpers';

export const useKanbanTaskUI  = () => {
	const dispatch = useAppDispatch();
	const {
		activeModalName,
		isSidebarOpen,
		errorMessage,
		isLoading,
	} = useAppSelector(state => state.ui);

	const { 
		boards,
		selectedBoardId,
		selectedColumnId,
		selectedSubtaskId,
		selectedTaskId 
	}   = useAppSelector(state => state.kanbanTask);

	const activeBoard  = findBoardById(boards, selectedBoardId);
	const activeColumn = findColumnById(activeBoard?.columns, selectedColumnId);
	const activeTask   = findTaskById(activeColumn, selectedTaskId);

	const closeModal        = () => dispatch(setActiveModalName(null));
	const toggleSidebar     = () => dispatch(setIsSidebarOpen(!isSidebarOpen));
	const onSelectBoardId   = (id: string | null) => dispatch(setSelectedBoardId(id));
	const onSelectColumnId  = (id: string | null) => dispatch(setSelectedColumnId(id));
	const onSelectTaskId    = (id: string | null) => dispatch(setSelectedTaskId(id));
	const onSelectSubtaskId = (id: string | null) => dispatch(setSelectedSubtaskId(id));
	const setActiveModal    = (modalName: string) => dispatch(setActiveModalName(modalName));

	return {
		//* Properties
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
