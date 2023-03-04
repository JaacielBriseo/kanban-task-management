import { useKanbanStore, useKanbanTaskUI } from '../../hooks';

export const DeleteBoard = () => {
	const { startDeletingBoard } = useKanbanStore();
	const { activeBoard, closeModal } = useKanbanTaskUI();
	if (!activeBoard) {
		return <h1>No board selected</h1>;
	}

	return (
		<div className='w-[343px] h-72 p-6 flex flex-col justify-between rounded-md'>
			<h1 className='headingL text-SoftRed'>Delete this board?</h1>
			<p className='bodyL text-MediumGrey'>
				Are you sure you want to delete the `{activeBoard.boardName}` board? This action will remove all columns and tasks
				and cannot be reversed.
			</p>
			<div className='flex flex-col space-y-3'>
				<button
					onClick={startDeletingBoard}
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
