import { addNewBoard, toggleAddNewBoardModal, useAppDispatch, useAppSelector } from '../../store';
import { CloseModalButton, ModalLayout, ModalTitle } from '../../ui';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';

export const AddNewBoardModal = () => {
	const { isAddNewBoardModalOpen } = useAppSelector(state => state.ui);
	const dispatch = useAppDispatch();
	const { values, handleChange, handleSubmit } = useFormik({
		initialValues: {
			boardName: '',
			boardColumn: '',
		},
		onSubmit: values => {
			dispatch(
				addNewBoard({
					boardId: uuidv4(),
					columns: [],
					name: values.boardName,
				})
			);
		},
	});
	return (
		<form onSubmit={handleSubmit}>
			<ModalLayout isShowing={isAddNewBoardModalOpen}>
				<CloseModalButton fn={toggleAddNewBoardModal} />
				<ModalTitle title='Add new board' />
				<div>
					<label>Board name</label>
					<input
						type='text'
						name='boardName'
						placeholder='e.g. Web Design'
						value={values.boardName}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label>Board columns</label>
					<input
						type='text'
						name='boardColumn'
						placeholder='e.g. Todo'
						value={values.boardColumn}
						onChange={handleChange}
					/>
				</div>
				<button type='submit'>Create new board</button>
			</ModalLayout>
		</form>
	);
};
