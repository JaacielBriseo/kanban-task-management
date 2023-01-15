import { toggleSelectModal, useAppDispatch, useAppSelector } from '../../store';
import styles from '../styles/styles.module.css';

export const Header = () => {
	const dispatch = useAppDispatch();
	const { isSelectModalOpen } = useAppSelector(state => state.ui);
	const { activeBoard } = useAppSelector(state => state.kanbanTask);

	return (
		<header className={`${styles.header} dark:bg-DarkGrey`}>
			<div className={styles.firstContainer}>
				<img src='./assets/logo-mobile.svg' alt='board' />
				<h1 className={`${styles.title} dark:text-White`}>{activeBoard ? activeBoard.name : 'Choose a board'}</h1>
				<button type='button' onClick={() => dispatch(toggleSelectModal())}>
					<img
						src={`./assets/icon-chevron-${isSelectModalOpen ? 'up' : 'down'}.svg`}
						alt='chevron'
						className={styles.chevron}
					/>
				</button>
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
