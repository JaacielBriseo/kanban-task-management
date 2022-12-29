import { useDarkSide } from '../../hooks';

export const ThemeToggler = () => {
	const [colorTheme, setTheme] = useDarkSide();
	const toggleDarkMode = () => {
		setTheme(colorTheme);
	};
	return <button onClick={toggleDarkMode}>Toggle Theme</button>;
};
