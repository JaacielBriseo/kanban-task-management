import { ErrorMessage, Field, Form, Formik } from 'formik';
import { editTask, toggleEditTaskModal, useAppDispatch, useAppSelector } from '../../store';
import { CloseModalButton, ModalLayout, ModalTitle } from '../../ui';
import { v4 as uuidv4 } from 'uuid';
export const EditTask = () => {
	const { isEditTaskModalOpen } = useAppSelector(state => state.ui);
	const { selectedBoardId, selectedTaskId } = useAppSelector(state => state.kanbanTask);
	const dispatch = useAppDispatch();
	return (
		<Formik
			initialValues={{ title: '', description: '', subtasks: '', status: '' }}
			onSubmit={({ description, status, subtasks, title }) => {
				if (selectedBoardId === null) {
					console.error('No board Id');
					return;
				}
				dispatch(
					editTask({
						boardId: selectedBoardId,
						columnId: status === 'Todo' ? '0' : status === 'Doing' ? '1' : '2',
						taskData: {
							description,
							status,
							statusId: status === 'Todo' ? '0' : status === 'Doing' ? '1' : '2',
							subtasks: [{ title: subtasks, isCompleted: false }],
							taskId: uuidv4(),
							title,
						},
						taskId: selectedTaskId!,
					})
				);
			}}>
			<Form>
				<ModalLayout isShowing={isEditTaskModalOpen}>
					<ModalTitle title='Edit task' />
					<CloseModalButton fn={toggleEditTaskModal} />
					<div className='flex flex-col'>
						<label>Title</label>
						<Field id='title' name='title' placeholder='e.g. Take a coffee break' className='border-2 p-2 rounded-md' />
						<ErrorMessage name='title' component='span' />
					</div>
					<div className='flex flex-col'>
						<label>Description</label>
						<Field
							id='description'
							name='description'
							placeholder='e.g. Lorem ipsum'
							as='textarea'
							className='border-2 p-2 rounded-md'
						/>
						<ErrorMessage name='description' component='span' />
					</div>
					<div className='flex flex-col'>
						<label>Subtasks</label>
						<Field
							id='subtasks'
							name='subtasks'
							placeholder='e.g. Take a coffee break'
							className='border-2 p-2 rounded-md'
						/>
						<ErrorMessage name='subtasks' component='span' />
					</div>
					<div className='flex flex-col'>
						<label>Status</label>
						<Field
							id='status'
							name='status'
							placeholder='e.g. Take a coffee break'
							component='select'
							className='border-2 p-2 rounded-md'>
							<option value=''>Choose an option</option>
							<option value='Todo'>Todo</option>
							<option value='Doing'>Doing</option>
							<option value='Done'>Done</option>
						</Field>
						<ErrorMessage name='status' component='span' />
					</div>
					<button type='submit'>Edit task</button>
				</ModalLayout>
			</Form>
		</Formik>
	);
};
