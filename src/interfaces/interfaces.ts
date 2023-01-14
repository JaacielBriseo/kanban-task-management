export interface Boards {
	boards: Board[];
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
	statusId: number | string;
	subtasks: Subtask[];
}

export interface Subtask {
	title: string;
	isCompleted: boolean;
}
