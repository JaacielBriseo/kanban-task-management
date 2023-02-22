import { useKanbanStore } from '../../hooks';
import { removeBoard, setSelectedBoardId, toggleDeleteBoardModal, useAppDispatch } from '../../store';

export const DeleteBoard = () => {
	const dispatch = useAppDispatch();
	const { activeBoard } = useKanbanStore();
	if (!activeBoard) {
		return <h1>No board selected</h1>;
	}
	const onDelete = () => {
		dispatch(removeBoard({ boardIdToDelete: activeBoard.boardId }));
		dispatch(toggleDeleteBoardModal());
		dispatch(setSelectedBoardId(null));
	};
	return (
		<div className='w-[343px] h-72 p-6 flex flex-col justify-between rounded-md'>
			<h1 className='headingL text-SoftRed'>Delete this task?</h1>
			<p className='bodyL text-MediumGrey'>
				Are you sure you want to delete the {activeBoard.name} board? This action will remove all columns and tasks and
				cannot be reversed.
			</p>
			<div className='flex flex-col space-y-3'>
				<button onClick={onDelete} className='font-bold text-[13px] bg-SoftRed text-White w-full py-2 rounded-[20px]'>
					Delete
				</button>
				<button
					onClick={() => dispatch(toggleDeleteBoardModal())}
					className='font-bold text-[13px] bg-MainPurple bg-opacity-10 text-MainPurple w-full py-2 rounded-[20px]'>
					Cancel
				</button>
			</div>
		</div>
	);
};
