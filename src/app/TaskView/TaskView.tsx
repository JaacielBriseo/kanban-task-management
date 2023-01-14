import {
	changeTaskColumnAndStatus,
	toggleIsSubtaskCompleted,
	toggleTaskViewModal,
	useAppDispatch,
	useAppSelector,
} from '../../store';
import { CloseModalButton, ModalLayout, ModalTitle } from '../../ui';
export const TaskView = () => {
	const dispatch = useAppDispatch();
	const { selectedBoardId, selectedColumnId, activeTask } = useAppSelector(state => state.kanbanTask);
	const { isTaskViewModalOpen } = useAppSelector(state => state.ui);

	return (
		<>
			{activeTask && (
				<ModalLayout isShowing={isTaskViewModalOpen}>
					<CloseModalButton fn={toggleTaskViewModal} />
					<ModalTitle title={activeTask.title} />
					<p>{activeTask.description}</p>
					{activeTask.subtasks.map((subtask, index) => (
						<label key={index} className='bg-LightGrey p-3 m-2 rounded-md'>
							<input
								type='checkbox'
								checked={subtask.isCompleted}
								onChange={() => {
									if (selectedBoardId === null || selectedColumnId === null) {
										console.error(`There is no selected column or board id`);
										return;
									}
									dispatch(
										toggleIsSubtaskCompleted({
											subtaskIndex: index,
											boardId: selectedBoardId,
											columnId: selectedColumnId,
											taskId: activeTask.taskId,
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
							value={activeTask.status}
							onChange={({ target }) => {
								if (selectedBoardId === null || selectedColumnId === null) {
									console.error(`There is no selected column or board id`);
									return;
								}
								dispatch(
									changeTaskColumnAndStatus({
										boardId: selectedBoardId,
										columnId: selectedColumnId,
										newStatus: target.value,
										taskId: activeTask.taskId,
									})
								);
							}}>
							<option value='Doing'>Doing</option>
							<option value='Todo'>Todo</option>
							<option value='Done'>Done</option>
						</select>
					</div>
				</ModalLayout>
			)}
		</>
	);
};
