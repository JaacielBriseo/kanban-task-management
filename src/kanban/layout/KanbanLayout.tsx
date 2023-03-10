import { Outlet } from 'react-router-dom';
import { Navbar, Sidebar, ToggleSidebarButton } from '../components';

export const KanbanLayout = () => {
	return (
		<div className='flex flex-col h-screen'>
			<div className='flex flex-1 max-w-full overflow-hidden'>
				<Sidebar />
				<div className='flex flex-col flex-1 overflow-x-auto'>
					<Navbar />
					<section className='flex flex-1 overflow-y-auto p-4'>
						<Outlet />
					</section>
				</div>
				<ToggleSidebarButton />
			</div>
		</div>
	);
};
