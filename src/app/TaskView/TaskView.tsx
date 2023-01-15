import {
	changeTaskColumnAndStatus,
	toggleIsSubtaskCompleted,
	toggleTaskViewModal,
	useAppDispatch,
	useAppSelector,
} from '../../store';
import { CloseModalButton, Loading, ModalLayout, ModalTitle } from '../../ui';
export const TaskView = () => {
	const dispatch = useAppDispatch();
	const { selectedBoardId, selectedColumnId, selectedTaskId, boards } = useAppSelector(state => state.kanbanTask);
	const { isTaskViewModalOpen } = useAppSelector(state => state.ui);
	if (selectedBoardId === null) {
		return <Loading />;
	}
	if (selectedColumnId === null) {
		return <Loading />;
	}
	if (selectedTaskId === null) {
		return <Loading />;
	}
	const { description, status, subtasks, taskId, title } =
		boards[selectedBoardId].columns[selectedColumnId].tasks[selectedTaskId];
	return (
		<ModalLayout isShowing={isTaskViewModalOpen}>
			<CloseModalButton fn={toggleTaskViewModal} />
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
									taskId: taskId,
								})
							);
						}}
					/>
					<span className='self-end w-4/5'>{subtask.title}</span>
				</label>
			))}
			<div className='space-y-3'>
				//! TODO: Handle move between columns and persist task view data
				{/* <p className='font-semibold text-sm'>Current status</p>
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
								taskId: taskId,
							})
						);
					}}>
					<option value='Doing'>Doing</option>
					<option value='Todo'>Todo</option>
					<option value='Done'>Done</option>
				</select> */}
			</div>
		</ModalLayout>
	);
};
