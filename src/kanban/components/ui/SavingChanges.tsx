import { useKanbanTaskUI } from '../../../hooks';

export const SavingChanges = () => {
	const { isSavingChanges, onSavingChanges, closeModal } = useKanbanTaskUI();
	return (
		<div className='absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2 bg-white p-20 rounded-md shadow-lg'>
			<div
				className={`${
					isSavingChanges === 'loading' ? 'border-t-transparent animate-spin' : ''
				}  border-solid  mx-auto flex justify-center items-center p-5 rounded-full border-MainPurple border-8 h-28 w-28`}>
				{isSavingChanges === 'successful' && <img src='/assets/icon-check.svg' alt='Success' className='w-10/12' />}
				{isSavingChanges === 'error' && <img src='/assets/icon-error.svg' alt='Error' className='w-2/3' />}
			</div>
			{isSavingChanges === 'successful' && <h1 className='text-center mt-10 headingL uppercase'>successful</h1>}
			{isSavingChanges === 'error' && <h1 className='text-center mt-10 headingL uppercase'>error</h1>}

			{isSavingChanges !== 'loading' && isSavingChanges !== null && (
				<button
					onClick={() => {
						onSavingChanges(null);
						closeModal();
					}}
					type='button'
					className={`${
						isSavingChanges === 'error' ? 'bg-SoftRed' : 'bg-MainPurple'
					} text-White mt-5 py-2 rounded-[20px] w-full`}>
					{isSavingChanges === 'error' ? 'Try again later' : 'Continue'}
				</button>
			)}
		</div>
	);
};
