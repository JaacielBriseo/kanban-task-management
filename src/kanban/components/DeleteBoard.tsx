import { findBoardById } from '../../helpers';
import { removeBoard, setSelectedBoardId, toggleDeleteBoardModal, useAppDispatch, useAppSelector } from '../../store';

export const DeleteBoard = () => {
	const dispatch = useAppDispatch();
	const { kanbanTask } = useAppSelector(state => state);
	const { selectedBoardId, boards } = kanbanTask;
	const selectedBoard = findBoardById(boards, selectedBoardId);
	if (!selectedBoard) {
		return <h1>No board selected</h1>;
	}
	const onDelete = () => {
		dispatch(removeBoard({ boardIdToDelete: selectedBoard.boardId }));
		dispatch(toggleDeleteBoardModal());
		dispatch(setSelectedBoardId(null));
	};
	return (
		<div className='w-[343px] h-72 p-6 flex flex-col justify-between'>
			<h1 className='headingL text-SoftRed'>Delete this task?</h1>
			<p className='bodyL text-MediumGrey'>
				Are you sure you want to delete the {selectedBoard.name} board? This action will remove all columns and tasks
				and cannot be reversed.
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
