import { Subtask } from '../../../interfaces';
import { toggleCheckedSubtask, toggleSubtaskCompleted, useAppDispatch, useAppSelector } from '../../../store';

export const MyCheckbox = ({ subtask }: { subtask: Subtask }) => {
	const dispatch = useAppDispatch();
	const { activeBoard } = useAppSelector(state => state.ui);
	return (
		<div className='bg-LightGrey p-3 m-2 rounded-md'>
			<label className='label'>
				<input
					className='input'
					type='checkbox'
					name={subtask.title}
					checked={subtask.isCompleted}
					onChange={() => {
						dispatch(toggleSubtaskCompleted({ subtask, activeBoard }));
						dispatch(toggleCheckedSubtask(subtask.title));
					}}
				/>
				<span className='self-end w-4/5'>{subtask.title}</span>
			</label>
		</div>
	);
};
