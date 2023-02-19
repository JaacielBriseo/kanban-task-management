import { useState } from 'react';
import { Modal } from './Modal';
import { SelectBoard } from './SelectBoard';
export const MobileNavbar = () => {
	const [isSelectBoardModalOpen, setIsSelectBoardModalOpen] = useState(false);
	return (
		<>
			<nav className='bg-white p-5 flex justify-between z-50'>
				<div className='flex space-x-5 w-3/5'>
					<img src='/assets/logo-mobile.svg' alt='Mobile' />
					<div className='flex items-center'>
						<h1 className='headingL'>Platform launch</h1>
						<button onClick={() => setIsSelectBoardModalOpen(current => !current)}>
							{isSelectBoardModalOpen ? (
								<img src='/assets/icon-chevron-up.svg' alt='Up' className='scale-110' />
							) : (
								<img src='/assets/icon-chevron-down.svg' alt='Down' className='scale-110' />
							)}
						</button>
					</div>
				</div>
				<div className='flex space-x-3'>
					<button className='bg-MainPurple w-12 h-8 flex justify-center items-center  rounded-full'>
						<img src='/assets/icon-add-task-mobile.svg' alt='' />
					</button>
					<img src='/assets/icon-vertical-ellipsis.svg' alt='' className='object-contain' />
				</div>
			</nav>
			{isSelectBoardModalOpen && (
				<Modal onClose={() => setIsSelectBoardModalOpen(current => !current)} customClass='w-[264px] h-[300px]'>
					<SelectBoard />
				</Modal>
			)}
		</>
	);
};
