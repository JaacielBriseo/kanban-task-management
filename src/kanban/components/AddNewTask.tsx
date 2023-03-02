import { Field, FieldArray, Form, Formik } from 'formik';
import { useKanbanStore, useUiStore } from '../../hooks';
import { Task } from '../../interfaces';
import { v4 as uuidv4 } from 'uuid';
export const AddNewTask = () => {
	const { startCreatingTask } = useKanbanStore();
	const {activeBoard}  = useUiStore()
	if (!activeBoard) return null;
	const placeholders = ['e.g. Make Coffee', 'e.g. Drink coffee and smile'];
	return (
		<Formik
			initialValues={{
				title: '',
				description: '',
				subtasks: ['', ''],
				status: '',
			}}
			onSubmit={values => {
				const newTask: Task = {
					description: values.description,
					status: values.status,
					taskId: uuidv4(),
					title: values.title,
					subtasks: values.subtasks.map(subtask => {
						return { isCompleted: false, subtaskId: uuidv4(), title: subtask };
					}),
				};
				startCreatingTask(newTask);
			}}>
			{({ values }) => (
				<Form className='w-[343px] p-5 rounded-md flex flex-col justify-between space-y-5'>
					<h1 className='headingL'>Add New Task</h1>
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
													placeholder={placeholders[index] || null}
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
							<option value=''>Select a status for your task</option>
							{activeBoard.columns.map(column => (
								<option key={column.columnId} value={column.columnName}>
									{column.columnName}
								</option>
							))}
						</Field>
					</div>
					<button type='submit' className='py-2 bg-MainPurple text-White font-bold text-[13px] rounded-[20px]'>
						Create Task
					</button>
				</Form>
			)}
		</Formik>
	);
};
