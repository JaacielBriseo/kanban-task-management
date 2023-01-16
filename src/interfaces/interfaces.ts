export interface KanbanSliceInitialValues {
	boards: Board[];
	selectedBoardId: string | null;
	selectedColumnId: string | null;
	selectedTaskId: string | null;
	selectedSubtaskId: string | null;
}

export interface Board {
	boardId: string;
	name: string;
	columns: Column[];
}

export interface Column {
	columnId: string;
	name: string;
	tasks: Task[];
}

export interface Task {
	taskId: string;
	title: string;
	description: string;
	status: string;
	statusId: string;
	subtasks: Subtask[];
}

export interface Subtask {
	title: string;
	isCompleted: boolean;
}

/**
 * Kanban Slice Payloads
 */

export interface SetSelectedColumnAndTaskIdPayload {
	payload: { columnId: string; taskId: string };
}
export interface ToggleIsSubtaskCompletedPayLoad {
	payload: { subtaskIndex: number; boardId: string; columnId: string; taskId: string };
}
export interface ChangeTaskColumnAndStatusPayload {
	payload: { newStatus: string; taskId: string; columnId: string; boardId: string };
}
export interface AddNewTaskPayload {
	payload: { newTask: Task; boardId: string; columnId: string };
}
export interface DeleteTaskPayload {
	payload: { taskId: string; boardId: string; columnId: string };
}