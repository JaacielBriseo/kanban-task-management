import { useAppSelector, useAppDispatch, setActiveBoard } from '../../store';
import { ThemeToggler } from '../../ui';
interface SelectBoardModalProps {
	boardNames: string[];
}
export const SelectBoardModal = ({ boardNames }: SelectBoardModalProps) => {
	const { isSelectModalOpen } = useAppSelector((state) => state.ui);
	const dispatch = useAppDispatch();
	return (
		<section className={`${isSelectModalOpen ? 'fixed' : 'hidden'} w-full h-screen bg-black bg-opacity-75 z-10`}>
			<div className={`w-[264px] h-[322px] mt-6 mx-auto p-3 rounded-lg shadow-lg bg-White dark:bg-DarkGrey`}>
				<ul>
					<h2 className='font-bold text-sm text-DarkGrey dark:text-LightGrey'>All boards ({boardNames.length})</h2>
					{boardNames.map((boardName) => (
						<div key={boardName}>
							<li className='hover:bg-blue-700 p-3'>
								<div className='flex items-center space-x-4 text-MediumGrey hover:text-White'>
									<img src='./assets/icon-board.svg' alt='board' />
									<button onClick={() => dispatch(setActiveBoard(boardName))} type='button' className='font-semibold'>
										{boardName}
									</button>
								</div>
							</li>
						</div>
					))}
					<button type='button' className='text-MainPurple font-bold'>
						+ Create New Board
					</button>
				</ul>
				<ThemeToggler />
			</div>
		</section>
	);
};
