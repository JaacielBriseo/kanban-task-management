import { Column } from '../interfaces/interfaces';
export const findColumnById = (columns: Column[] | undefined, id: string | null) => {
	if (!id || !columns) return;
	return columns.find(column => column.columnId === id);
};
