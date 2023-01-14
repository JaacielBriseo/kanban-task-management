import { MyFormInput } from ".";

export const MyFormSubtasksInputs = () => {
	return (
		<div className='flex flex-col'>
			<div className='flex items-center justify-between'>
				<MyFormInput
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
	);
};
