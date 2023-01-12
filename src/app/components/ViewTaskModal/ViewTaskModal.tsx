import { closeViewTaskModal, useAppDispatch, useAppSelector } from '../../../store';
import { MyCheckbox, MySelect } from '.';
import './styles.css';
export const ViewTaskModal = () => {
	const dispatch = useAppDispatch();
	const { isViewTaskModalOpen, viewTaskModalInfo } = useAppSelector(state => state.ui);
	const { description, subtasks, title } = viewTaskModalInfo;

	return (
		<section className={`section ${isViewTaskModalOpen ? 'flex ' : 'hidden '}`}>
			<div className='viewTaskModal'>
				<button className='button' onClick={() => dispatch(closeViewTaskModal())}>
					<img src='./assets/icon-cross.svg' alt='cross' />
				</button>
				<h1 className='font-bold'>{title}</h1>
				<p className='description'>{description}</p>

				{subtasks?.map(subtask => (
					<MyCheckbox subtask={subtask} key={subtask.title} />
				))}

				<MySelect />
			</div>
		</section>
	);
};
