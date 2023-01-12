import { useAppSelector, useAppDispatch, toggleNewTaskModal } from '../../../store';
import { CloseModalButton } from '../../../ui';
import { ModalLayout } from '../../layout';

export const AddNewTaskModal = () => {
	const { isNewTaskModalOpen } = useAppSelector(state => state.ui);
	return (
		<ModalLayout isShowing={isNewTaskModalOpen}>
			<CloseModalButton fn={toggleNewTaskModal}/>
			<h1>New Task Modal</h1>
		</ModalLayout>
	);
};
