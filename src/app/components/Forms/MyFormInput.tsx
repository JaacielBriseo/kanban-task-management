import { ErrorMessage, Field, useField } from 'formik';
interface Props {
	label: string;
	name: string;
	placeholder: string;
	errors: string | undefined;
	[x: string]: any;
}

export const MyFormInput = ({ errors, label, ...props }: Props) => {
	const [field] = useField(props);
	return (
		<div className='flex flex-col'>
			<label htmlFor={props.id || props.name} className='text-MediumGrey text-sm font-medium'>
				{label}
			</label>
			<Field
				{...field}
				{...props}
				className={`border-2 p-2 h-10 rounded-md placeholder:text-sm ${errors && 'border-2 border-SoftRed'} ${
					props.customclass && props.customclass
				}`}
			/>
			<ErrorMessage name={props.name} component='span' className='text-SoftRed' />
		</div>
	);
};
