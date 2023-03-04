import { FieldArray, Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updateBoard, useAppDispatch } from '../../store';
import {  useKanbanTaskUI } from '../../hooks';
export const EditBoard = () => {
	const dispatch = useAppDispatch();
	const { activeBoard } = useKanbanTaskUI();

	if (!activeBoard) return null;
	return (
		<Formik
			initialValues={{
				boardName: activeBoard.boardName,
				boardColumns: activeBoard.columns.map(column => column.columnName),
			}}
			validationSchema={Yup.object({
				boardName: Yup.string()
					.min(3, 'Min 3 characters')
					.max(20, 'No more than 20 characters')
					.required('Board name is required.'),
			})}
			onSubmit={({ boardColumns, boardName }) => {
				dispatch(
					updateBoard({
						...activeBoard,
						boardName,
						columns:
							boardColumns.length === 0
								? []
								: activeBoard.columns.map((column, index) => {
										return { ...column, name: boardColumns[index] };
								  }),
					})
				);
			}}>
			{({ values }) => (
				<Form className='p-5 rounded-md flex flex-col space-y-8 w-[343px] min-h-[380px]   md:p-8'>
					<h1 className='headingL'>Edit Board</h1>
					<div className='space-y-1 flex flex-col'>
						<label htmlFor='boardName' className='headingS text-MediumGrey'>
							Board Name
						</label>
						<Field type='text' name='boardName' placeholder='e.g. Web Design' className='border' />
						<ErrorMessage name='boardName' component={'span'} className='text-red-500' />
					</div>
					<div className='space-y-2'>
						<label htmlFor='boardColumns' className='headingS text-MediumGrey'>
							Board Columns
						</label>
						<FieldArray name='boardColumns'>
							{({ remove, push }) => (
								<>
									{values.boardColumns.map((boardColumn, index) => {
										return (
											<div key={index} className='flex justify-between'>
												<Field name={`boardColumns.${index}`} className='border p-1 w-11/12' type='text' />
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
						Save Changes
					</button>
				</Form>
			)}
		</Formik>
	);
};
