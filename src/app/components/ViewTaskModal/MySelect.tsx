import { setCurrentStatus, updateTaskStatus, useAppDispatch, useAppSelector } from '../../../store';

export const MySelect = () => {
	const dispatch = useAppDispatch();
	const { viewTaskModalInfo, activeBoard } = useAppSelector(state => state.ui);
	return (
		<div className='space-y-3'>
			<p className='font-semibold text-sm'>Current status</p>
			<select
				className='select'
				value={viewTaskModalInfo.status}
				onChange={({ target }) => {
					dispatch(setCurrentStatus(target.value));
					dispatch(updateTaskStatus({ taskId: viewTaskModalInfo.id, status: target.value, activeBoard: activeBoard }));
				}}>
				<option value='Doing'>Doing</option>
				<option value='Todo'>Todo</option>
				<option value='Done'>Done</option>
			</select>
		</div>
	);
};
