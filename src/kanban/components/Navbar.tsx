import { Modal } from './Modal';
import { SelectBoard } from './SelectBoard';
import { useAppDispatch, useAppSelector, toggleBoardModal } from '../../store';
interface Props {
	className?: string;
}
export const Navbar: React.FC<Props> = ({ className }) => {
	const { ui } = useAppSelector(state => state);
	// const{boards}= kanbanTask
	const { isSelectBoardModalOpen, isSidebarOpen } = ui;
	const dispatch = useAppDispatch();
	return (
		<>
			<nav className={`bg-white p-5 flex justify-between z-40 ${className}`}>
				<div className='flex items-center space-x-5 w-3/5'>
					<div className={`flex items-center md:space-x-2 ${isSidebarOpen && 'mr-20'}`}>
						<img src='/assets/logo-mobile.svg' alt='Mobile' />
						<h1 className='hidden md:block headingXL'>kanban</h1>
					</div>
					<div className='hidden md:block w-[1px] h-full bg-LinesLight dark:bg-LinesDark' />
					<div className='flex items-center space-x-2'>
						<h2 className='headingL'>Platform launch</h2>
						<button className='md:hidden' onClick={() => dispatch(toggleBoardModal())}>
							{isSelectBoardModalOpen ? (
								<img src='/assets/icon-chevron-up.svg' alt='Up' className='scale-110' />
							) : (
								<img src='/assets/icon-chevron-down.svg' alt='Down' className='scale-110' />
							)}
						</button>
					</div>
				</div>
				<div className='flex space-x-3'>
					<button className='bg-MainPurple w-12 h-8 flex justify-center items-center rounded-full md:w-40 md:h-12'>
						<img src='/assets/icon-add-task-mobile.svg' alt='add' className='md:hidden' />
						<p className='hidden md:block text-White headingM'>+ Add New Task</p>
					</button>
					<img src='/assets/icon-vertical-ellipsis.svg' alt='ellipsis' className='object-contain' />
				</div>
			</nav>
			{isSelectBoardModalOpen && (
				<Modal onClose={() => dispatch(toggleBoardModal())} customClass='w-[264px] h-[300px]'>
					<SelectBoard />
				</Modal>
			)}
		</>
	);
};
