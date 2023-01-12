import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useAppSelector, toggleNewTaskModal } from '../../../store';
import { CloseModalButton } from '../../../ui';
import { ModalLayout } from '../../layout';
import { MyFormTitle } from '../';

export const AddNewTaskModal = () => {
	const { isNewTaskModalOpen } = useAppSelector(state => state.ui);
	const initialValues = {
		title: '',
		description: '',
		status: '',
		subtasks: '',
	};
	//! TODO: Add Id and statusId <number> when dispatching action to add task
	return (
		<Formik initialValues={initialValues} onSubmit={console.log}>
			{formik => (
				<Form>
					<ModalLayout isShowing={isNewTaskModalOpen}>
						<CloseModalButton fn={toggleNewTaskModal} />
						<MyFormTitle title='add new task' />
						<div className='flex flex-col'>
							<label>Title</label>
							<Field name='title' type='text' className='border-2 h-10' />
							<ErrorMessage name='title' component='span' />
						</div>

						<div className='flex flex-col'>
							<label>Description</label>
							<Field name='description' type='text' className='border-2 h-10' />
							<ErrorMessage name='description' component='span' />
						</div>

						<div className='flex flex-col'>
							<label>Subtasks</label>
							<Field name='subtasks' type='text' className='border-2 h-10' />
							<ErrorMessage name='subtasks' component='span' />
						</div>

						<div className='flex flex-col'>
							<label>Status</label>
							<Field name='status' as='select' className='border-2 h-10'>
								<option value='Todo'>Todo</option>
								<option value='Done'>Done</option>
								<option value='Doing'>Doing</option>
							</Field>
							<ErrorMessage name='jobType' component='span' />
						</div>
						<button type='submit'>Submit Values</button>
					</ModalLayout>
				</Form>
			)}
		</Formik>
	);
};
