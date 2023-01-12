import { closeViewTaskModal, useAppDispatch, useAppSelector } from '../../../store';
import { MyCheckbox, MySelect } from '.';
import './styles.css';
export const ViewTaskModal = () => {
	const dispatch = useAppDispatch();
	const { isViewTaskModalOpen, viewTaskModalInfo, activeBoard } = useAppSelector(state => state.ui);
	const { description, subtasks, title } = viewTaskModalInfo;

	return (
		<section className={` ${isViewTaskModalOpen ? 'flex ' : 'hidden '}`}>
			<div className='viewTaskModal'>
				<button onClick={() => dispatch(closeViewTaskModal())}>
					<img src='./assets/icon-cross.svg' alt='cross' />
				</button>
				<h1>{title}</h1>
				<p>{description}</p>

				{subtasks?.map(subtask => (
					<MyCheckbox subtask={subtask} key={subtask.title} />
				))}

				<MySelect />
			</div>
		</section>
	);
};
