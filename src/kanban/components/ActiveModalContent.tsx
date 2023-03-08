import { useKanbanTaskUI } from '../../hooks';
import { AccessToThirdPartyBoard, AddMemberToBoard, AddNewBoard, AddNewTask, DeleteBoard, DeleteTask, EditBoard, EditTask, SelectBoard, ViewTask } from '.';
import { SavingChanges } from './ui/SavingChanges';

export const ActiveModalContent = () => {
	const { activeModalName } = useKanbanTaskUI();
	let content;
	switch (activeModalName) {
		case 'AddNewBoard':
			content = <AddNewBoard />;
			break;
		case 'AccessToThirdPartyBoard':
			content = <AccessToThirdPartyBoard />;
			break;
		case 'AddMemberToBoard':
			content = <AddMemberToBoard />;
			break;
		case 'AddNewTask':
			content = <AddNewTask />;
			break;
		case 'DeleteBoard':
			content = <DeleteBoard />;
			break;
		case 'DeleteTask':
			content = <DeleteTask />;
			break;
		case 'EditBoard':
			content = <EditBoard />;
			break;
		case 'EditTask':
			content = <EditTask />;
			break;
		case 'SavingChanges':
			content = <SavingChanges />;
			break;
		case 'SelectBoard':
			content = <SelectBoard />;
			break;
		case 'ViewTask':
			content = <ViewTask />;
			break;

		default:
			content = null;
			break;
	}
	return <>{content}</>;
};
