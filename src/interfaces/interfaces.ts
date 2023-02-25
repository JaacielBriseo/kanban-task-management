export interface User {
	name: string | null;
	email: string | null;
	img: string | null;
	role: 'SUPER_ROLE' | 'USER_ROLE' | 'ADMIN_ROLE' | null;
	isActive: boolean | null;
	google: boolean | null;
	uid: string | null;
}
export interface AuthSliceValues {
	status: 'checking' | 'authenticated' | 'not-authenticated';
	user: User;
	errorMessage: string | undefined | null;
}

export interface KanbanSliceInitialValues {
	boards: Board[];
	selectedBoardId: string | null;
	selectedColumnId: string | null;
	selectedTaskId: string | null;
	selectedSubtaskId: string | null;
	isLoading: boolean;
	errorMessage: null | string;
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
	subtaskId: string;
}

/**
 * Kanban Slice Payloads
 */

export interface SetSelectedColumnAndTaskIdPayload {
	payload: { columnId: string; taskId: string };
}
export interface ToggleIsSubtaskCompletedPayLoad {
	subtaskId: string;
}
export interface ChangeTaskColumnAndStatusPayload {
	payload: { newStatus: string; taskId: string; columnName: string; boardId: string; columnId: string };
}
export interface AddNewTaskPayload {
	payload: { newTask: Task; boardId: string; columnName: string };
}
export interface DeleteTaskPayload {
	payload: { taskId: string; boardId: string; columnId: string };
}

