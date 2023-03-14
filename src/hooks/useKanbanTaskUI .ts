import {
	setActiveModalName,
	setIsSavingChanges,
	setIsSidebarOpen,
	setSelectedBoardId,
	setSelectedColumnId,
	setSelectedSubtaskId,
	setSelectedTaskId,
	useAppDispatch,
	useAppSelector,
} from '../store';
import { findBoardById, findColumnById, findTaskById } from '../helpers';
import { ModalName } from '../interfaces';

export const useKanbanTaskUI  = () => {
	const dispatch = useAppDispatch();
	const {
		activeModalName,
		isSidebarOpen,
		errorMessage,
		isSavingChanges,
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
	const setActiveModal    = (modalName: ModalName) => dispatch(setActiveModalName(modalName));
	const onSavingChanges   = (status:'loading' |'successful' | 'error'|null)=> dispatch(setIsSavingChanges(status))

	return {
		//* Properties
		activeModalName,
		activeBoard,
		activeColumn,
		activeTask,
		errorMessage,
		isSavingChanges,
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
		onSavingChanges
	};
};
