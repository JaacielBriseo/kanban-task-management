import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../store';

type Props = {
	fn: ActionCreatorWithoutPayload<string>;
};
export const CloseModalButton = ({ fn }: Props) => {
	const dispatch = useAppDispatch();
	return (
		<button type='button' className='buttonModal' onClick={() => dispatch(fn())}>
			<img src='./assets/icon-cross.svg' alt='cross' />
		</button>
	);
};
