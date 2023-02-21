import { FieldArray, Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createNewBoard, useAppDispatch } from '../../store';
import { v4 as uuidv4 } from 'uuid';
export const AddNewBoard = () => {
	const dispatch = useAppDispatch();
	return (
		<Formik
			initialValues={{
				boardName: '',
				boardColumns: ['Todo', 'Doing'],
			}}
			validationSchema={Yup.object({
				boardName: Yup.string()
					.min(3, 'Min 3 characters')
					.max(20, 'No more than 20 characters')
					.required('Board name is required.'),
			})}
			onSubmit={({ boardColumns, boardName }) => {
				dispatch(
					createNewBoard({
						boardId: uuidv4(),
						columns: boardColumns.map(boardColumn => {
							return { columnId: uuidv4(), name: boardColumn, tasks: [] };
						}),
						name: boardName,
					})
				);
			}}>
			{({ values }) => (
				<Form className='p-5 flex flex-col justify-around h-full'>
					<h1 className='headingL'>Add New Board</h1>
					<div className='space-y-1 flex flex-col'>
						<label htmlFor='boardName' className='headingS text-MediumGrey'>
							Board Name
						</label>
						<Field type='text' name='boardName' placeholder='e.g. Web Design' className='border' />
						<ErrorMessage name='boardName' component={'span'} className='text-red-500' />
					</div>
					<div className='space-y-1'>
						<label htmlFor='boardColumns' className='headingS text-MediumGrey'>
							Board Columns
						</label>
						<FieldArray name='boardColumns'>
							{({ remove, push }) => (
								<>
									{values.boardColumns.map((boardColumn, index) => {
										return (
											<div key={index} className='flex justify-between'>
												<Field name={`boardColumns.${index}`} className='border' type='text' />
												<button type='button' onClick={() => remove(index)}>
													<img src='/assets/icon-cross.svg' alt='cross' className='object-contain' />
												</button>
											</div>
										);
									})}
									<button
										onClick={() => push('')}
										type='button'
										className='text-MainPurple bg-MainPurple bg-opacity-10 w-full py-2 rounded-[20px]'>
										+Add New Column
									</button>
								</>
							)}
						</FieldArray>
					</div>
					<button type='submit' className='w-full bg-MainPurple text-White py-2 rounded-[20px]'>
						Create New Board
					</button>
				</Form>
			)}
		</Formik>
	);
};
