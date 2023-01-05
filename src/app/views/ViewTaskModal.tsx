import { useAppSelector, useAppDispatch, closeViewTaskModal } from '../../store';
import { useState } from 'react';

export const ViewTaskModal = () => {
	const dispatch = useAppDispatch();
	const { isViewTaskModalOpen, viewTaskData } = useAppSelector((state) => state.ui);
	const { description, status, subtasks, title } = viewTaskData;
	const [isSubtaskChecked, setIsSubtaskChecked] = useState(true);

	const handleSubtaskCheck = (e: any) => {
		setIsSubtaskChecked(e.target.checked)
	};
	return (
		<div
			className={` ${
				isViewTaskModalOpen ? 'flex ' : 'hidden '
			}fixed inset-0 items-center justify-center w-full min-h-screen z-10 bg-black bg-opacity-75 `}
		>
			<div className='relative bg-White w-10/12 mx-auto min-h-[480px] rounded-lg p-5 flex flex-col justify-around'>
				<button onClick={() => dispatch(closeViewTaskModal())} className='absolute right-4 top-3'>
					<img src='./assets/icon-cross.svg' />
				</button>
				<h1 className='text-lg font-bold mt-3'>{title}</h1>
				<p className='text-MediumGrey'>{description}</p>

				{subtasks.map((subtask) => (
					<div key={subtask.title} className='bg-LightGrey flex space-x-8 items-center p-3'>
						<input
							type='checkbox'
							className=' accent-MainPurple'
							checked={isSubtaskChecked}
							onChange={handleSubtaskCheck}
							name={subtask.title}
						/>
						<label className={`font-bold text-sm ${isSubtaskChecked ? 'text-LinesDark line-through' : ''}`}>
							{subtask.title}
						</label>
					</div>
				))}

				<div className='space-y-3'>
					<p className='text-MediumGrey font-semibold text-sm'>Current status: {status}</p>
					<select /*value={status}*/>
						<option value='Doing'>Doing</option>
						<option value='Todo'>Todo</option>
						<option value='Done'>Done</option>
					</select>
				</div>
			</div>
		</div>
	);
};
