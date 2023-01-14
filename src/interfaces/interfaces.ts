export interface KanbanSliceInitialValues {
	boards: Board[];
	selectedBoardId: number;
	selectedColumnId: number;
	selectedTaskId: number;
	selectedSubtaskId: number;
	activeBoard: Board;
	activeTask: Task;
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
