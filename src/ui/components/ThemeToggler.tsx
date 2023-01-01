import { useState } from 'react';
import { useDarkSide } from '../../hooks';

export const ThemeToggler = () => {
	const [colorTheme, setTheme] = useDarkSide();
	const [toggle, setToggle] = useState(true);
	const toggleClass = ' transform translate-x-5';
	const toggleDarkMode = () => {
		setTheme(colorTheme);
		setToggle(!toggle);
	};
	return (
		<div className='flex justify-center items-center mt-5 space-x-2 bg-LightGrey dark:bg-VeryDarkGrey rounded-lg w-[235px] h-12 mx-auto'>
			<img src='./assets/icon-dark-theme.svg' alt='dark' />
			<div
				className='md:w-14 md:h-7 w-12 h-6 flex items-center bg-MainPurple rounded-full p-1 cursor-pointer'
				onClick={() => {
					setToggle(!toggle);
					toggleDarkMode();
				}}
			>
				<div
					className={
						'bg-White md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out' +
						(toggle ? null : toggleClass)
					}
				></div>
			</div>
			<img src='./assets/icon-light-theme.svg' alt='light' />
		</div>
	);
};
