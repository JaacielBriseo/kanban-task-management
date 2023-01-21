import { findBoardIndex } from '../../helpers';
import {
	changeTaskColumnAndStatus,
	toggleIsSubtaskCompleted,
	toggleTaskViewModal,
	useAppDispatch,
	useAppSelector,
} from '../../store';
import { CloseModalButton, Loading, ModalLayout, ModalTitle, TaskActionsButtons } from '../../ui';
export const TaskView = () => {
	const dispatch = useAppDispatch();
	const { selectedBoardId, selectedColumnId, selectedTaskId, boards } = useAppSelector(state => state.kanbanTask);
	const { isTaskViewModalOpen } = useAppSelector(state => state.ui);
	if (selectedBoardId === null || selectedColumnId === null || selectedTaskId === null) {
		return <Loading />;
	}

	// const findBoardIndex = boards.findIndex(board => board.boardId === selectedBoardId);
	const boardIdx = findBoardIndex(boards,selectedBoardId)
	const findColumnIndex = boards[boardIdx].columns.findIndex(col => col.columnId === selectedColumnId);

	const task = boards[boardIdx].columns[findColumnIndex].tasks.find(task => task.taskId === selectedTaskId);
	if (!task) {
		return <Loading />;
	}
	const { description, status, subtasks, taskId, title } = task;
	return (
		<ModalLayout isShowing={isTaskViewModalOpen}>
			<CloseModalButton fn={toggleTaskViewModal} />
			<TaskActionsButtons boardId={selectedBoardId} taskId={taskId} columnId={selectedColumnId} />
			<ModalTitle title={title} />
			<p>{description}</p>
			{subtasks.map((subtask, index) => (
				<label key={index} className='bg-LightGrey p-3 m-2 rounded-md'>
					<input
						type='checkbox'
						checked={subtask.isCompleted}
						onChange={() => {
							if (selectedBoardId === null || selectedColumnId === null) {
								console.error('No selected board or column id checkbox');
								return;
							}
							dispatch(
								toggleIsSubtaskCompleted({
									subtaskIndex: index,
									boardId: selectedBoardId,
									columnId: selectedColumnId,
									taskId,
								})
							);
						}}
					/>
					<span className='self-end w-4/5'>{subtask.title}</span>
				</label>
			))}
			<div className='space-y-3'>
				<p className='font-semibold text-sm'>Current status</p>
				<select
					value={status}
					onChange={({ target }) => {
						if (selectedBoardId === null || selectedColumnId === null) {
							console.error('No selected board or column id select');
							return;
						}
						dispatch(
							changeTaskColumnAndStatus({
								boardId: selectedBoardId,
								columnId: selectedColumnId,
								newStatus: target.value,
								taskId,
								columnName: target.value,
							})
						);
					}}>
					{boards[findBoardIndex(boards, selectedBoardId!)].columns.map(column => (
						<option key={column.columnId} value={column.name}>
							{column.name}
						</option>
					))}
				</select>
			</div>
		</ModalLayout>
	);
};
