import { useKanbanStore, useKanbanTaskUI } from '../../hooks';

export const DeleteTask = () => {
	const { startDeletingTask } = useKanbanStore();
	const { activeTask, closeModal } = useKanbanTaskUI();
	if (!activeTask) {
		return <h1>No task selected</h1>;
	}

	return (
		<div className='w-[343px] h-72 p-6 rounded-md flex flex-col justify-between'>
			<h1 className='headingL text-SoftRed'>Delete this task?</h1>
			<p className='bodyL text-MediumGrey'>
				Are you sure you want to delete the {activeTask.title} task and its subtasks? This action cannot be reversed.
			</p>
			<div className='flex flex-col space-y-3'>
				<button
					onClick={startDeletingTask}
					className='font-bold text-[13px] bg-SoftRed text-White w-full py-2 rounded-[20px]'>
					Delete
				</button>
				<button
					onClick={closeModal}
					className='font-bold text-[13px] bg-MainPurple bg-opacity-10 text-MainPurple w-full py-2 rounded-[20px]'>
					Cancel
				</button>
			</div>
		</div>
	);
};
