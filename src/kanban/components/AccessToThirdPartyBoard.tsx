import { useState } from 'react';
import { useKanbanStore } from '../../hooks';
export const AccessToThirdPartyBoard = () => {
	const [thirdPartyBoardId, setThirdPartyBoardId] = useState<string>('');
	const { startNavigateToThirdPartyBoard } = useKanbanStore();
	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (thirdPartyBoardId.length < 20) return;
		startNavigateToThirdPartyBoard(thirdPartyBoardId);
	};
	return (
		<form onSubmit={onSubmit} className='w-[343px] p-5 rounded-md flex flex-col justify-between space-y-5'>
			<label htmlFor='thirdPartyBoardId'>
				Enter the board ID to access.
				<input
					type='text'
					name='thirdPartyBoardId'
					className='border'
					placeholder='18746-74237...'
					value={thirdPartyBoardId}
					onChange={e => {
						setThirdPartyBoardId(e.target.value);
					}}
				/>
			</label>
			<button type='submit' className='py-2 bg-MainPurple text-White font-bold text-[13px] rounded-[20px]'>
				Go to board
			</button>
		</form>
	);
};
