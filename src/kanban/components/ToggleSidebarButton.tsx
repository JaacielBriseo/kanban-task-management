import { useKanbanTaskUI } from '../../hooks/useKanbanTaskUI ';

export const ToggleSidebarButton = () => {
	const { isSidebarOpen, toggleSidebar } = useKanbanTaskUI();

	return (
		<button
			onClick={toggleSidebar}
			className={`hidden fixed -left-12 bottom-3 rounded-full w-[112px] h-[56px] px-6 md:flex items-center justify-end bg-MainPurple ${
				isSidebarOpen ? 'scale-0 ' : 'scale-100'
			} duration-200`}>
			<img src='/assets/icon-show-sidebar.svg' alt='Show sidebar' className='w-4 h-3' />
		</button>
	);
};
