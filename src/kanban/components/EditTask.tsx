import { Field, FieldArray, Form, Formik } from 'formik';
import { useKanbanTaskUI } from '../../hooks';
import { updateTask, useAppDispatch } from '../../store';
import { Task } from '../../interfaces';
export const EditTask = () => {
	const { activeTask, activeBoard } = useKanbanTaskUI();
	const dispatch = useAppDispatch();
	if (!activeTask || !activeBoard) return null;
	return (
		<Formik
			initialValues={{
				title: activeTask.title,
				description: activeTask.description,
				subtasks: activeTask.subtasks.map(subtask => subtask.title),
				status: activeTask.status,
			}}
			onSubmit={values => {
				const updatedTask: Task = {
					...activeTask,
					description: values.description,
					status: values.status === activeTask.status ? activeTask.status : values.status,
					title: values.title,
					subtasks:
						values.subtasks.length === 0
							? []
							: activeTask.subtasks.map(subtask => subtask.title) === values.subtasks
							? activeTask.subtasks
							: activeTask.subtasks.map((subtask, index) => {
									return { ...subtask, title: values.subtasks[index] };
							  }),
				};
				dispatch(updateTask({ updatedTask }));
			}}>
			{({ values }) => (
				<Form className='w-[343px] p-5 rounded-md flex flex-col justify-between space-y-5'>
					<h1 className='headingL'>Edit Task</h1>
					<div className='headingS text-MediumGrey flex flex-col justify-between space-y-3'>
						<div className='flex flex-col space-y-2'>
							<label htmlFor='title'>Title</label>
							<Field
								name='title'
								className='border p-2 text-Dark placeholder:opacity-50'
								placeholder='e.g. Take coffee break'
							/>
						</div>
						<div className='flex flex-col space-y-2'>
							<label htmlFor='description'>Description</label>
							<Field
								name='description'
								component='textarea'
								className='border p-2 text-Dark placeholder:opacity-50 min-h-[80px]'
								placeholder='e.g. It’s always good to take a break. This 
                15 minute break will  recharge the batteries 
                a little.'
							/>
						</div>
						<div className='flex flex-col space-y-2'>
							<label htmlFor='subtasks'>Subtasks</label>
							<FieldArray name='subtasks'>
								{({ remove, push }) => (
									<>
										{values.subtasks.map((_, index) => (
											<div key={index} className='flex justify-between'>
												<Field
													name={`subtasks.${index}`}
													className='border p-2 w-11/12 placeholder:opacity-50'
													type='text'
												/>
												<button type='button' onClick={() => remove(index)}>
													<img src='/assets/icon-cross.svg' alt='cross' className='object-contain' />
												</button>
											</div>
										))}
										<button
											onClick={() => push('')}
											type='button'
											className='text-MainPurple bg-MainPurple bg-opacity-10 w-full py-2 rounded-[20px]'>
											+Add New Subtask
										</button>
									</>
								)}
							</FieldArray>
						</div>
					</div>
					<div className='w-full flex flex-col space-y-2'>
						<label htmlFor='status' className='headingS text-MediumGrey'>
							Status
						</label>

						<Field component='select' name='status' className='border'>
							<option value={activeTask.status}>{activeTask.status}</option>
							{activeBoard.columns
								.filter(column => column.columnName !== activeTask.status)
								.map(column => (
									<option key={column.columnId} value={column.columnName}>
										{column.columnName}
									</option>
								))}
						</Field>
					</div>
					<button type='submit' className='py-2 bg-MainPurple text-White font-bold text-[13px] rounded-[20px]'>
						Update Task
					</button>
				</Form>
			)}
		</Formik>
	);
};
