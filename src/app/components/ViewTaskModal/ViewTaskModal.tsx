import {
	closeViewTaskModal,
	toggleCheckedSubtask,
	toggleSubtaskCompleted,
	useAppDispatch,
	useAppSelector,
} from '../../../store';
import './styles.css';
import { useEffect, useState } from 'react';
export const ViewTaskModal = () => {
	const dispatch = useAppDispatch();
	const { isViewTaskModalOpen, viewTaskModalInfo, activeBoard } = useAppSelector(state => state.ui);
	const { boards } = useAppSelector(state => state.kanbanTask);

	useEffect(() => {
		console.log('Cambio');
	}, [boards]);

	return (
		<section className={` ${isViewTaskModalOpen ? 'flex ' : 'hidden '}`}>
			<div className='viewTaskModal'>
				<button onClick={() => dispatch(closeViewTaskModal())}>
					<img src='./assets/icon-cross.svg' alt='cross' />
				</button>
				<h1>{viewTaskModalInfo.title}</h1>
				<p>{viewTaskModalInfo.description}</p>

				{viewTaskModalInfo.subtasks?.map(subtask => (
					<div key={subtask.title} className='bg-LightGrey p-3 rounded-md'>
						<label>
							<input
								type='checkbox'
								name={subtask.title}
								checked={subtask.isCompleted}
								onChange={() => {
									dispatch(toggleSubtaskCompleted({ subtask, activeBoard }));
									dispatch(toggleCheckedSubtask(subtask.title));
								}}
							/>
							{subtask.title}
						</label>
					</div>
				))}

				<div className='space-y-3'>
					<p className='font-semibold text-sm'>Current status</p>
					<select /*value={status}*/>
						<option value='Doing'>Doing</option>
						<option value='Todo'>Todo</option>
						<option value='Done'>Done</option>
					</select>
				</div>
			</div>
		</section>
	);
};
