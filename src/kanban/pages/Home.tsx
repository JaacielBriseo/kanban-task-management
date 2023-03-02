import { useUiStore } from '../../hooks';
import { Board, EmptyBoard, Modal, Navbar, Sidebar, ToggleSidebarButton , ActiveModalContent} from '../components';
export const Home = () => {
	const { activeBoard, activeModalName, isSidebarOpen, closeModal } = useUiStore();
	return (
		<>
			<Navbar />
			<div className='md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 3xl:grid-cols-8'>
				{isSidebarOpen && <Sidebar className='md:col-span-1 lg:col-span-1 xl:col-span-1 3xl:col-span-1' />}
				<div
					className={`overflow-auto ${
						isSidebarOpen ? 'md:col-span-2 lg:col-span-3 xl:col-span-5 3xl:col-span-7' : 'md:col-span-full'
					}`}>
					{!activeBoard ? (
						<h1 className='fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] headingL text-center text-MediumGrey'>
							Select a board to display
						</h1>
					) : activeBoard.columns.length ? (
						<Board board={activeBoard} />
					) : (
						<EmptyBoard />
					)}
				</div>
			</div>
			<ToggleSidebarButton />
			{activeModalName && (
				<Modal
					onClose={closeModal}
					isFullScreen={activeModalName !== 'SelectBoard'}
					customClass={activeModalName === 'SelectBoard' ? 'w-[264px] h-[300px]' : ''}>
					{<ActiveModalContent />}
				</Modal>
			)}
		</>
	);
};
