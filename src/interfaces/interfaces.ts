export interface KanbanSliceInitialValues {
	boards: Board[] | null;
	selectedBoardId: number | null;
	selectedColumnId: number | null;
	selectedTaskId: number | null;
	selectedSubtaskId: number | null;
	activeBoard: Board | null;
	activeTask: Task | null;
}

export interface Board {
	boardId: number;
	name: string;
	columns: Column[];
}

export interface Column {
	columnId: number;
	name: string;
	tasks: Task[];
}

export interface Task {
	taskId: number;
	title: string;
	description: string;
	status: string;
	statusId: number;
	subtasks: Subtask[];
}

export interface Subtask {
	title: string;
	isCompleted: boolean;
}
