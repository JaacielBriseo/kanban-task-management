import styles from '../styles/styles.module.css';
export const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.firstContainer}>
				<img src='./assets/logo-mobile.svg' alt='board' />
				<h1 className={styles.title}>Platform Launch</h1>
				<img src='./assets/icon-chevron-down.svg' alt='chevron down' className={styles.chevron} />
			</div>
			<div className={styles.secondContainer}>
				<button className={styles.headerButton}>
					<img src='./assets/icon-add-task-mobile.svg' alt='add task' />
				</button>
				<img src='./assets/icon-vertical-ellipsis.svg' alt='ellipsis' className={styles.ellipsisLogo} />
			</div>
		</header>
	);
};
