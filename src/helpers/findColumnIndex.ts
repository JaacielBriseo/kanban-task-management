import { Column } from '../interfaces';
export const findColumnIndex = (columns: Column[], columnId: string):number => {
	return columns.findIndex(col => col.columnId === columnId);
};
