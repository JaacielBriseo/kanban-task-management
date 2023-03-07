import { ErrorMessage, Field, Form, Formik } from 'formik';
import { User } from '../../interfaces';
import { useKanbanStore } from '../../hooks';
export const AddMemberToBoard = () => {
	//TODO: Logica y UI  para agregar un usuario a nuestro equipo y permitirle acceder al board especifico
	const {startAddingNewMember} = useKanbanStore()
	return (
		<Formik
			initialValues={{
				name: '',
				email: '',
			}}
			onSubmit={({ email, name }) => {
				const newMemberData: Pick<User, 'email' | 'name'> = {
					name,
					email,
				};
				startAddingNewMember(newMemberData);
			}}>
			{({ values }) => (
				<Form className='w-[343px] p-5 rounded-md flex flex-col justify-between space-y-5'>
					<h1 className='headingL'>Add New Member</h1>
					<div className='space-y-1 flex flex-col'>
						<label htmlFor='name' className='headingS text-MediumGrey'>
							New Member Name
						</label>
						<Field type='text' name='name' placeholder='Complete name' className='border' />
						<ErrorMessage name='name' component={'span'} className='text-red-500' />
					</div>
					<div className='space-y-1 flex flex-col'>
						<label htmlFor='email' className='headingS text-MediumGrey'>
							New Member Email
						</label>
						<Field type='text' name='email' placeholder='correo@google.com' className='border' />
						<ErrorMessage name='email' component={'span'} className='text-red-500' />
					</div>
					<button type='submit' className='py-2 bg-MainPurple text-White font-bold text-[13px] rounded-[20px]'>
						Submit
					</button>
				</Form>
			)}
		</Formik>
	);
};
