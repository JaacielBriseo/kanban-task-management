import { closeViewTaskModal, useAppSelector } from '../../../store';
import { CloseModalButton } from '../../../ui';
import { ModalLayout } from '../../layout';
import { MyFormTitle, MyCheckbox, MySelect } from '../';
import './styles.css';
export const ViewTaskModal = () => {
	const { isViewTaskModalOpen, viewTaskModalInfo } = useAppSelector(state => state.ui);
	const { description, subtasks, title } = viewTaskModalInfo;

	return (
		<ModalLayout isShowing={isViewTaskModalOpen}>
			<CloseModalButton fn={closeViewTaskModal} />
			<MyFormTitle title={title} />
			<p className='description'>{description}</p>
			{subtasks?.map(subtask => (
				<MyCheckbox subtask={subtask} key={subtask.title} />
			))}
			<MySelect />
		</ModalLayout>
	);
};
