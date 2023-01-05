import { useMemo } from 'react';
import { useAppSelector } from '../store';

export const useBoardColumns = () => {
	const { boards } = useAppSelector((state) => state.kanbanTask);
	const { activeBoard } = useAppSelector((state) => state.ui);

	const board = useMemo(() => {
		return boards.find((board) => board.name === activeBoard);
	}, [activeBoard, boards]);

	const todoColumn = board?.columns.find((column) => column.name === 'Todo');
	const todoTasks = todoColumn?.tasks;

	const doingColumn = board?.columns.find((column) => column.name === 'Doing');
	const doingTasks = doingColumn?.tasks;

	const doneColumn = board?.columns.find((column) => column.name === 'Done');
	const doneTasks = doneColumn?.tasks;
	return {
		todoTasks,
		doingTasks,
		doneTasks,
	};
};
