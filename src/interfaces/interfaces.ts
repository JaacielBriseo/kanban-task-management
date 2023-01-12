export interface Boards {
	boards: Board[];
}

export interface Board {
	id: number;
	name: string;
	columns: Column[];
}

export interface Column {
	id: number;
	name: string;
	tasks: Task[];
}

export interface Task {
	id: number;
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
