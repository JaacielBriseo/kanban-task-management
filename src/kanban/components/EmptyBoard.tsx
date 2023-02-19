export const EmptyBoard = () => {
	return (
		<div className='w-full min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center space-y-5'>
			<p className='headingL text-MediumGrey w-11/12 text-center'>
				This board is empty. Create a new column to get started.
			</p>
			<button className='w-44 h-12 bg-MainPurple rounded-3xl headingM text-White'>+ Add New Column</button>
		</div>
	);
};
