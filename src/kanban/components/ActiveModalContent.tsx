import { useUiStore } from '../../hooks';
import { AddNewBoard, AddNewTask, DeleteBoard, DeleteTask, EditBoard, EditTask, SelectBoard, ViewTask } from '.';
export const ActiveModalContent = () => {
	const { activeModalName } = useUiStore();
	let content;
	switch (activeModalName) {
		case 'AddNewBoard':
			content = <AddNewBoard />;
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
