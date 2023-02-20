import { ReactElement, useEffect } from 'react';
import ReactDOM from 'react-dom';
interface Props {
	children: ReactElement | ReactElement[] | string | number;
	actionBar?: JSX.Element;
	customClass?: string;
	onClose: () => void;
}

export const Modal = ({ onClose, actionBar, children, customClass }: Props) => {
	useEffect(() => {
		document.body.classList.add('overflow-hidden');
		return () => document.body.classList.remove('overflow-hidden');
	}, []);

	return ReactDOM.createPortal(
		<div>
			<div onClick={onClose} className='fixed inset-0 bg-gray-300 opacity-80 z-10 mt-[4.5rem]' />
			<div className={`z-20 fixed inset-0 mt-24 mx-auto flex items-center justify-center bg-white rounded-lg ${customClass}`}>
				<div className='flex flex-col justify-between h-full w-full'>
					{children}
					{actionBar && <div className='flex justify-end'>{actionBar}</div>}
				</div>
			</div>
		</div>,
		document.querySelector('.modal-container') as Element
	);
};
