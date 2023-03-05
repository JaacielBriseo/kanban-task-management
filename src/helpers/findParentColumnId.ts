import {  Column } from '../interfaces';

export const findParentColumnId = (columns: Column[], taskStatus:string) => {
	const matchColumnWithTaskStatus = columns.find(column => column.columnName === taskStatus);
	if (!matchColumnWithTaskStatus) {
		console.error('No match column with task status');
		return;
	}
	return matchColumnWithTaskStatus.columnId;
};
