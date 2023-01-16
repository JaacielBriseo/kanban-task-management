import Swal from 'sweetalert2';
import { deleteTask, toggleTaskViewModal } from '../../store';
import { useAppDispatch } from '../../store/rtk-hooks';

export const TaskActionsButtons = ({
	boardId,
	taskId,
	columnId,
}: {
	boardId: string;
	taskId: string;
	columnId: string;
}) => {
	const dispatch = useAppDispatch();
	const onDeleteClick = () => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
		}).then(result => {
			if (result.isConfirmed) {
				Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
				dispatch(deleteTask({ boardId, taskId, columnId }));
				dispatch(toggleTaskViewModal());
			}
		});
	};
	return (
		<div className='taskActionsButtons space-x-4'>
			<button type='button' onClick={onDeleteClick}>
				<img src='./assets/icon-delete.svg' alt='cross' />
			</button>
			<button type='button'>
				<img src='./assets/icon-edit.svg' alt='cross' />
			</button>
		</div>
	);
};
