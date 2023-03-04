import { useState } from 'react';
import { useKanbanTaskUI } from '../../hooks';
interface Props {
	className?: string;
}
export const Navbar: React.FC<Props> = ({ className }) => {
	const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
	const { activeBoard, activeModalName, isSidebarOpen, setActiveModal, closeModal } = useKanbanTaskUI();
	const toggleSelectBoardModal = () => {
		!activeModalName ? setActiveModal('SelectBoard') : closeModal();
	};
	return (
		<>
			<nav className={`bg-white p-5 flex justify-between z-40 ${className}`}>
				<div className='flex items-center space-x-5 '>
					<div className={`flex items-center md:space-x-2 ${isSidebarOpen && 'mr-20'}`}>
						<img src='/assets/logo-mobile.svg' alt='Mobile' />
						<h1 className='hidden md:block headingXL'>kanban</h1>
					</div>
					<div className='hidden md:block w-[1px] h-full bg-LinesLight dark:bg-LinesDark' />
					<div className='flex items-center space-x-2' onClick={toggleSelectBoardModal}>
						<h2 className='headingL'>{activeBoard ? activeBoard.boardName : 'Select a board'}</h2>
						<div className='md:hidden'>
							{activeModalName === 'SelectBoard' ? (
								<img src='/assets/icon-chevron-up.svg' alt='Up' className='scale-110' />
							) : (
								<img src='/assets/icon-chevron-down.svg' alt='Down' className='scale-110' />
							)}
						</div>
					</div>
				</div>
				<div className='flex space-x-3 relative'>
					<button
						onClick={() => setActiveModal('AddNewTask')}
						disabled={!activeBoard}
						className='bg-MainPurple w-12 h-8 flex justify-center items-center rounded-full md:w-40 md:h-12'>
						<img src='/assets/icon-add-task-mobile.svg' alt='add' className='md:hidden' />
						<p className='hidden md:block text-White headingM'>+ Add New Task</p>
					</button>
					<button
						className='disabled:cursor-not-allowed'
						disabled={!activeBoard}
						onClick={() => setIsDropdownMenuOpen(current => !current)}>
						<img src='/assets/icon-vertical-ellipsis.svg' alt='ellipsis' className='object-contain' />
					</button>
					<div
						className={`${
							isDropdownMenuOpen ? 'flex' : 'hidden'
						} md:w-[100px] md:h-[60px] xl:w-[190px] xl:h-[90px] absolute right-0 top-[3.1rem] md:top-16 bg-White border shadow-lg z-50`}>
						<button
							className='p-1'
							onClick={() => {
								setActiveModal('DeleteBoard');
								setIsDropdownMenuOpen(false);
							}}>
							<img src='/assets/icon-delete.svg' alt='delete' />
						</button>
						<button
							className='p-1'
							onClick={() => {
								setActiveModal('EditBoard');
								setIsDropdownMenuOpen(false);
							}}>
							<img src='/assets/icon-edit.svg' alt='edit' />
						</button>
					</div>
				</div>
			</nav>
		</>
	);
};
