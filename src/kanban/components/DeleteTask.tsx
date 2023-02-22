import { findBoardById, findColumnById, findTaskById } from '../../helpers';
import { deleteTask, toggleDeleteTaskModal, useAppDispatch, useAppSelector } from '../../store';

export const DeleteTask = () => {
	const dispatch = useAppDispatch();
	const { kanbanTask } = useAppSelector(state => state);
	const { selectedBoardId, selectedColumnId, selectedTaskId, boards } = kanbanTask;
	const selectedBoard = findBoardById(boards, selectedBoardId);
	if (!selectedBoard || !selectedColumnId || !selectedTaskId) return null;
	const column = findColumnById(selectedBoard.columns, selectedColumnId);
	const task = findTaskById(column, selectedTaskId);
	if (!task) {
		return <h1>No task selected</h1>;
	}
	const onDelete = () => {
		dispatch(deleteTask({ taskIdToDelete: task.taskId }));
		dispatch(toggleDeleteTaskModal());
	};
	return (
		<div className='w-[343px] h-72 p-6 flex flex-col justify-between'>
			<h1 className='headingL text-SoftRed'>Delete this task?</h1>
			<p className='bodyL text-MediumGrey'>
				Are you sure you want to delete the {task.title} task and its subtasks? This action cannot be reversed.
			</p>
			<div className='flex flex-col space-y-3'>
				<button onClick={onDelete} className='font-bold text-[13px] bg-SoftRed text-White w-full py-2 rounded-[20px]'>
					Delete
				</button>
				<button
					onClick={() => dispatch(toggleDeleteTaskModal())}
					className='font-bold text-[13px] bg-MainPurple bg-opacity-10 text-MainPurple w-full py-2 rounded-[20px]'>
					Cancel
				</button>
			</div>
		</div>
	);
};
