import { findBoard, getTaskId } from '../../helpers';
import { addNewTask, toggleNewTaskModal, useAppDispatch, useAppSelector } from '../../store';
import * as Yup from 'yup';
interface Args {
    description:string;
    status:string;
    title:string;
    subtasks:string
}
export const useAddNewTaskForm = () => {
	const dispatch = useAppDispatch();
	const { isNewTaskModalOpen, activeBoard } = useAppSelector(state => state.ui);
	const { boards } = useAppSelector(state => state.kanbanTask);
	const board = findBoard(boards, activeBoard);
	const formData = {
		title: '',
		description: '',
		status: '',
		subtasks: '',
	};
	const validations = Yup.object({
		title: Yup.string()
			.min(5, 'Title must be 5 characters min')
			.max(20, 'Title is max 20 characters')
			.required('Field required'),
		description: Yup.string().min(10, 'You must have at least 10 characters in description').required('Field required'),
		status: Yup.string().required('Field required').notOneOf([''], 'You have to choose an status'),
	});
	const handleSubmit = ({ description, status, title, subtasks }:Args) => {
		dispatch(
			addNewTask({
				activeBoard,
				description,
				id: getTaskId(board!).length,
				status,
				statusId: status === 'Todo' ? 0 : status === 'Doing' ? 1 : 2,
				title,
				subtasks: {
					title: subtasks,
					isCompleted: status !== 'Done' ? false : true,
				},
			})
		);
		dispatch(toggleNewTaskModal());
	};
	return {validations, handleSubmit,formData,isNewTaskModalOpen};
};
