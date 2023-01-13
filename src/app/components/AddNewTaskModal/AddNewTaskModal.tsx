import { Form, Formik } from 'formik';
import { toggleNewTaskModal } from '../../../store';
import { useAddNewTaskForm } from '../../hooks';
import { CloseModalButton } from '../../../ui';
import { ModalLayout } from '../../layout';
import { MyFormInput, MyFormSelect, MyFormSubmitButton, MyFormTitle } from '../';

export const AddNewTaskModal = () => {
	const { formData, validations, handleSubmit, isNewTaskModalOpen } = useAddNewTaskForm();
	return (
		<Formik
			initialValues={formData}
			validationSchema={validations}
			onSubmit={({ description, status, subtasks, title }) => {
				handleSubmit({ description, status, subtasks, title });
			}}>
			{({ errors }) => (
				<Form>
					<ModalLayout isShowing={isNewTaskModalOpen}>
						<CloseModalButton fn={toggleNewTaskModal} />
						<MyFormTitle title='add new task' />
						<MyFormInput label='Title' name='title' placeholder='e.g. Take coffe break' errors={errors.title} />
						<MyFormInput
							label='Description'
							name='description'
							placeholder={`e.g. It's always good idea to take a break. This 15 minutes break will recharge batteries`}
							errors={errors.description}
							as='textarea'
							customclass='h-20 placeholder:text-justify'
						/>
						<div className='flex flex-col'>
							<div className='flex items-center justify-between'>
								<MyFormInput
									errors={errors.subtasks}
									label='Subtasks'
									name='subtasks'
									placeholder='e.g. Make coffee'
									customclass='w-[120%]'
								/>
								<button type='button'>
									<img src='/assets/icon-cross.svg' alt='cross' />
								</button>
							</div>
							<button className='mt-3 p-2 rounded-full font-bold text-sm bg-MainPurple bg-opacity-[0.15] text-MainPurple'>
								+ Add new subtask
							</button>
						</div>
						<MyFormSelect errors={errors.status} label='Status' name='status'>
							<option value=''>Choose the status</option>
							<option value='Todo'>Todo</option>
							<option value='Done'>Done</option>
							<option value='Doing'>Doing</option>
						</MyFormSelect>
						<MyFormSubmitButton text='Create Task' />
					</ModalLayout>
				</Form>
			)}
		</Formik>
	);
};
