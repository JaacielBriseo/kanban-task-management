import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useAppSelector, toggleNewTaskModal, useAppDispatch, addNewTask } from '../../../store';
import { CloseModalButton } from '../../../ui';
import { ModalLayout } from '../../layout';
import { MyFormTitle } from '../';
import { findBoard, getTaskId } from '../../../helpers';

export const AddNewTaskModal = () => {
	const dispatch = useAppDispatch();
	const { isNewTaskModalOpen, activeBoard } = useAppSelector(state => state.ui);
	const { boards } = useAppSelector(state => state.kanbanTask);
	const board = findBoard(boards, activeBoard);
	const formData = {
		title: '',
		description: '',
		status: '',
		subtasks: '',
	};
	return (
		<Formik
			initialValues={formData}
			onSubmit={({ description, status, subtasks, title }) => {
				dispatch(
					addNewTask({
						activeBoard,
						description,
						id: getTaskId(board!).length,
						status,
						statusId: status === 'Todo' ? 0 : status === 'Doing' ? 1 : 2,
						title,
						subtasks: {
							title: subtasks,
							isCompleted: status !== 'Done' ? false : true,
						},
					})
				);
				dispatch(toggleNewTaskModal());
			}}>
			{formik => (
				<Form>
					<ModalLayout isShowing={isNewTaskModalOpen}>
						<CloseModalButton fn={toggleNewTaskModal} />
						<MyFormTitle title='add new task' />
						<div className='flex flex-col'>
							<label className='text-MediumGrey text-sm font-medium'>Title</label>
							<Field
								placeholder='e.g. Take coffe break'
								name='title'
								type='text'
								className='border-2 p-2 h-10 rounded-md placeholder:text-sm'
							/>
							<ErrorMessage name='title' component='span' />
						</div>

						<div className='flex flex-col'>
							<label className='text-MediumGrey text-sm font-medium'>Description</label>
							<Field
								as='textarea'
								placeholder={`e.g. It's always good idea to take a break. This 15 minutes break will recharge batteries`}
								name='description'
								type='text'
								className='border-2 p-2 h-20 rounded-md placeholder:text-justify placeholder:text-sm'
							/>
							<ErrorMessage name='description' component='span' />
						</div>

						<div className='flex flex-col'>
							<label className='text-MediumGrey text-sm font-medium'>Subtasks</label>
							<div className='flex justify-between'>
								<Field
									placeholder='e.g. Make coffe'
									name='subtasks'
									type='text'
									className='border-2 p-2 h-10 rounded-md w-11/12 placeholder:text-sm'
								/>
								<button type='button'>
									<img src='/assets/icon-cross.svg' alt='cross' />
								</button>
							</div>
							<button className='mt-3 p-2 rounded-full font-bold text-sm bg-MainPurple bg-opacity-[0.15] text-MainPurple'>
								+ Add new subtask
							</button>
							<ErrorMessage name='subtasks' component='span' />
						</div>

						<div className='flex flex-col'>
							<label className='text-MediumGrey text-sm font-medium'>Status</label>
							<Field name='status' as='select' className='border-2 h-10 rounded-md'>
								<option value=''>Choose the status</option>
								<option value='Todo'>Todo</option>
								<option value='Done'>Done</option>
								<option value='Doing'>Doing</option>
							</Field>
							<ErrorMessage name='jobType' component='span' />
						</div>
						<button className='mt-3 p-2 rounded-full font-bold bg-MainPurple text-White text-sm' type='submit'>
							Create Task
						</button>
					</ModalLayout>
				</Form>
			)}
		</Formik>
	);
};
