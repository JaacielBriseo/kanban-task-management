import { Column } from '../interfaces/interfaces';

export const findColumnByName = (columns: Column[] | undefined, name: string) => {
	if (!columns) return;
	return columns.find(col => col.columnName === name);
};
