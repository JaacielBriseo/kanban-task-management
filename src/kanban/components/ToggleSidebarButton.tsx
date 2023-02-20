import { toggleSidebar, useAppDispatch, useAppSelector } from '../../store';

export const ToggleSidebarButton = () => {
	const { isSidebarOpen } = useAppSelector(state => state.ui);
	const dispatch = useAppDispatch();
	return (
		<button
			style={{
				display: isSidebarOpen ? 'none' : '',
			}}
			onClick={() => dispatch(toggleSidebar())}
			className='hidden fixed -left-12 bottom-10 rounded-full w-[112px] h-[56px] px-6 md:flex items-center justify-end bg-MainPurple'>
			<img src='/assets/icon-show-sidebar.svg' alt='Show sidebar' className='w-4 h-3' />
		</button>
	);
};
