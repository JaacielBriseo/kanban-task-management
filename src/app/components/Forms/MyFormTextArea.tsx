import { ErrorMessage, Field, FieldAttributes, useField } from 'formik';
interface Props {
	label: string;
	name: string;
	placeholder: string;
	errors: string | undefined;
	[x: string]: FieldAttributes<any>;
}

export const MyFormTextArea = ({ errors, label, ...props }: Props) => {
	const [field] = useField(props);
	return (
		<div className='flex flex-col'>
			<label htmlFor={props.id || props.name} className='text-MediumGrey text-sm font-medium'>
				{label}
			</label>
			<Field
				as='textarea'
				{...field}
				{...props}
				className={`border-2 p-2 h-20 rounded-md placeholder:text-justify placeholder:text-sm ${
					errors && 'border-2 border-SoftRed'
				}`}
			/>
			<ErrorMessage name={props.name} component='span' className='text-SoftRed' />
		</div>
	);
};
