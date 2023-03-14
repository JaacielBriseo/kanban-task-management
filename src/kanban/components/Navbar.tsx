import { useKanbanTaskUI } from '../../hooks';

export const Navbar: React.FC = () => {
	const { activeBoard, activeModalName, setActiveModal, closeModal } = useKanbanTaskUI();
	const toggleSelectBoardModal = () => {
		!activeModalName ? setActiveModal('SelectBoard') : closeModal();
	};
	return (
		<>
			<nav className='bg-white p-5 flex justify-between z-40'>
				<div className='flex items-center space-x-5 '>
					<div className='flex items-center md:space-x-2'>
						<img src='/assets/logo-mobile.svg' alt='Mobile' />
						<h1 className='hidden md:block headingXL'>kanban</h1>
					</div>
					<div className='flex items-center space-x-2' onClick={toggleSelectBoardModal}>
						<h2 className='headingL'>{activeBoard ? activeBoard.boardName : 'Select a board'}</h2>
						<div className='md:hidden'>
							<img
								src={`/assets/icon-chevron-${activeModalName === 'SelectBoard' ? 'up' : 'down'}.svg`}
								alt='Up'
								className='scale-110'
							/>
						</div>
					</div>
				</div>
				<div className='flex space-x-3'>
					<button
						onClick={() => setActiveModal('AddNewTask')}
						disabled={!activeBoard}
						className='bg-MainPurple w-12 h-8 flex justify-center items-center rounded-full md:w-40 md:h-12'>
						<img src='/assets/icon-add-task-mobile.svg' alt='add' className='md:hidden' />
						<p className='hidden md:block text-White headingM'>+ Add New Task</p>
					</button>
					<div className='flex group relative' tabIndex={activeBoard ? -1 : undefined}>
						<button className='disabled:cursor-not-allowed' disabled={!activeBoard}>
							<img src='/assets/icon-vertical-ellipsis.svg' alt='ellipsis' className='object-contain' />
						</button>
						<div
							className={`invisible absolute top-full -left-24 flex flex-col items-center space-y-3 bg-White p-5 transform opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:opacity-100`}>
							<h1 className='headingM'>
								Manager: <span className='text-MediumGrey'>{activeBoard?.manager?.name}</span>
							</h1>
							<div>
								<h4 className='headingM'>Members:</h4>
								<ul>
									{activeBoard?.members?.map(member => (
										<li key={member.uid}>
											<span className='text-MediumGrey'>{member.name}</span>
										</li>
									))}
								</ul>
							</div>
							<div className='flex space-x-3'>
								<button
									onClick={() => {
										setActiveModal('DeleteBoard');
									}}>
									<img src='/assets/icon-delete.svg' alt='delete' />
								</button>
								<button
									onClick={() => {
										setActiveModal('EditBoard');
									}}>
									<img src='/assets/icon-edit.svg' alt='edit' />
								</button>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};
